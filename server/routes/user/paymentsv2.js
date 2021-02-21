const express = require("express");
const Stripe = require("stripe");
const {User} = require("../../database/schema");
const {
  getLawyersByUserId,
  getWebsiteByUserId,
  updateWebsite,
} = require("../../database/website");
const {updateUser, getUserById} = require("../../database/user");
const {
  createCampaign,
  getCampaignByUserId,
  updateCampaign,
  deleteCampaign,
} = require("../../database/campaign");

const {getCMS} = require("../../database/cms");
const request = require("request");

const {createSession} = require("../../database/sessions");
const {route} = require("next/dist/next-server/server/router");

const {sendCancelSubscription} = require("../../email");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

// const SESION_PRICE = 49;
// const DESPLAZAMIENTO_PRICE = 150;
// const AMOUNT_FOR_NOT_CHARGE_TRAVELS = 150;
const MIN_INVEST = 10;
const PAUSE_INVEST = 0;

// const PLANES = {
//   autonomo: {
//     price: 29.99,
//     allowedLawyers: 1,
//   },
//   asociados: {
//     price: 49.99,
//     allowedLawyers: 2,
//   },
//   bufete: {
//     price: 99.99,
//     allowedLawyers: 9999,
//   },
// };

const stripeErrors = {
  incorrect_number: "El número de tarjeta es incorrecto.",
  invalid_number: "El número de tarjeta no es un número de tarjeta válido.",
  invalid_expiry_month: "El mes de caducidad de la tarjeta no es válido.",
  invalid_expiry_year: "El año de caducidad de la tarjeta no es válido.",
  invalid_cvc: "El código de seguridad de la tarjeta no es válido.",
  expired_card: "La tarjeta ha caducado.",
  incorrect_cvc: "El código de seguridad de la tarjeta es incorrecto.",
  incorrect_zip: "Falló la validación del código postal de la tarjeta.",
  card_declined: "La tarjeta fué rechazada.",
  missing: "El cliente al que se está cobrando no tiene tarjeta",
  processing_error: "Ocurrió un error procesando la tarjeta.",
  rate_limit:
    "Ocurrió un error debido a consultar la API demasiado rápido. Por favor, avísanos si recibes este error continuamente.",
};

const getAmount = async (photos, videos) => {
  const {prices} = await getCMS();

  const {
    fotos: PHOTO_SESION,
    videos: VIDEO_SESION,
    gastos: DESPLAZAMIENTO_PRICE,
    notFees: AMOUNT_FOR_NOT_CHARGE_TRAVELS,
  } = prices;

  let amount = photos * PHOTO_SESION + videos * VIDEO_SESION;
  if (amount >= AMOUNT_FOR_NOT_CHARGE_TRAVELS)
    return {amount: amount * 100, fees: null};
  else
    return {
      amount: (amount + DESPLAZAMIENTO_PRICE) * 100,
      fees: DESPLAZAMIENTO_PRICE,
    };
};

/**
 * SESSION BOOKING ROUTES
 */

router.post("/sessionbooking", async (req, res) => {
  const {order, id, userId} = req.body;

  const {amount, fees} = await getAmount(
    Number(order.photos),
    Number(order.videos)
  );

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "EUR",
      description: "book session",
      payment_method: id,
      confirm: true,
    });

    await createSession(userId, {...order, amount: amount / 100, fees});
  } catch (error) {
    const code = error.raw.code;
    const data = stripeErrors[code] || error.raw.message;
    return res.status(400).json({ok: false, data});
  }
  return res.json({ok: true, data: "correcto"});
});

/**
 * CAMPAIGN ROUTES
 */

/**
 *  CREAR UNA CAMPAÑA
 *
 */
router.post("/campaign", async (req, res) => {
  // USUARIO CREA SOLICITA LA CAMPAÑA -> SE GUARDAN LOS DATOS
  // USUARIO CONFIRMA EL IMPORTE DE COMPROBACION -> SE ACTUALIZA A UN ESTADO ACTIVOD

  // USUARIO PUEDE MODIFICAR

  try {
    const campaign = await getCampaignByUserId(req.user._id);
    if (campaign) {
      return res.json({
        ok: false,
        data: "Este usuario ya tiene una campaña creada",
      });
    }
    await createCampaign(req.user._id, req.body);
    return res.json({
      ok: true,
      data:
        "Su campaña ha sido creada con éxito, recuerde confirmar el importe de comprobación para activarla",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      ok: false,
      data: "Hubo un error al momento de crear su campaña de marketing",
    });
  }
});

/**
 * ACTUALIZAR A UNA CAMPAÑA
 */
router.put("/campaign", async (req, res) => {
  try {
    const campaign = await getCampaignByUserId(req.user._id);
    if (!campaign) {
      return res
        .status(404)
        .json({ok: false, data: "Error al intentar actualizar su campaña."});
    }

    let msg;

    if (req.body.action === "activate") {
      if (!req.body.payload.importe) {
        return res.status(400).json({
          ok: false,
          data: "Debe proporcionar un monto para el importe de comprobación.",
        });
      }

      await updateCampaign(campaign._id, {
        ...req.body.payload,
        activationDate: new Date(Date.now()),
        status: "active",
      });
      msg = "Su campaña ha sido activada exitosamente.";
    } else if (req.body.action === "pause") {
      await updateCampaign(campaign._id, {
        status: "created",
        invest: "",
      });
      msg = "Su campaña se ha puesto en pausa.";
    } else if (req.body.action === "update") {
      await updateCampaign(campaign._id, req.body.payload);
      msg = "Su campaña ha sido actualizada exitosamente.";
    }

    return res.json({ok: true, data: msg});
  } catch (error) {
    console.log(error);
    return res.json({
      ok: false,
      data: "Hubo un error al momento de crear su campaña de marketing.",
    });
  }
});

/**
 *  GET CAMPAIGN BY USER ID
 */
router.get("/campaign", async (req, res) => {
  const campaign = await getCampaignByUserId(req.user._id);
  if (campaign) return res.json({ok: true, data: campaign});
  else
    return res
      .status(400)
      .json({ok: false, data: "No existe campaña asociada a este usuario"});
});

/**
 *  Link Billing stripe
 */

router.post("/customer", async (req, res) => {
  const {stripeCustomer} = req.body;

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomer,
      return_url: "https://hfma.es/dashboard",
    });

    res.status(200).json({ok: true, data: session});
  } catch (error) {
    res.status(200).json({ok: false, data: error});
  }
});

/**
 *  GET COUPONS STRIPE
 */

router.get("/couponStripe", async (req, res) => {
  try {
    const couponList = await stripe.coupons.list();
    res.status(200).json({ok: true, data: couponList});
  } catch (error) {
    res.status(200).json({ok: false, data: error});
  }
});

/**
 *  UPDATE BILLINGS STRIPE
 */
router.post("/updateBilling", async (req, res) => {
  console.log(req.body);
  const userInfo = await updateUser(req.body.userId, {
    billing: {
      fiscalName: req.body.fiscalName,
      direction: req.body.direction,
      nif: req.body.nif,
    },
  });
  if (!userInfo) {
    return res.status(500).json({ok: false, data: "Error en la peticion"});
  }

  const stripeChange = await stripe.customers.update(
    req.body.stripeCustomerId,
    {
      invoice_settings: {
        custom_fields: [
          {
            name: "Fiscal name",
            value: `${
              req.body.fiscalName.length !== 0 ? req.body.fiscalName : "-----"
            }`,
          },
          {
            name: "Direction",
            value: `${
              req.body.direction.length !== 0 ? req.body.direction : "-----"
            }`,
          },
          {
            name: "NIF-IVA",
            value: `${req.body.nif.length !== 0 ? req.body.nif : "-----"}`,
          },
        ],
      },
    }
  );
  if (!stripeChange)
    return res.status(500).json({ok: false, data: "Error en la peticion"});
  else return res.status(200).json({ok: true, data: "Informacion actualizada"});
});

/**
 *  PLAN SUBSCRIPTION
 */

router.post("/plan", async (req, res) => {
  const {id: paymentMethodId, plan, payload, coupon} = req.body;

  const user = req.user;

  const {prices} = await getCMS();

  if (!prices) {
    return res
      .status(500)
      .json({ok: false, data: "No se han inizializado los precios"});
  }

  const PLANES = {
    autonomo: {
      price: prices.autonomo,
      allowedLawyers: 1,
      id: process.env.STRIPE_PLAN_AUTONOMO_KEY,
    },
    asociados: {
      price: prices.asociados,
      allowedLawyers: 2,
      id: process.env.STRIPE__ASOCIADOS_KEY,
    },
    bufete: {
      price: prices.bufete,
      allowedLawyers: 9999,
      id: process.env.STRIPE_PLAN_BUFETE_KEY,
    },
  };

  const lawyers = await getLawyersByUserId(user._id);

  let userInfo;

  if (lawyers >= 0) {
    if (PLANES[plan].allowedLawyers < lawyers) {
      //this was moved by hitting the button to subscribe to a plan in the frontend
      /* return res.status(400).json({
        ok: false,
        data:
          "La cantidad de abogados que tienes registrados es mayor a la permitida por el plan que seleccionaste, sugerimos seleccionar otro plan o eliminar abogados de tu sitio web",
      }); */
    }
  } else {
    return res.status(500).json({
      ok: false,
      data:
        "Hubo un error al momento de realizar el pago, ningun cargo fue realizado.",
    });
  }

  try {
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: user.stripeCustomerId,
    });

    // Change the default invoice settings on the customer to the new payment method

    await stripe.customers.update(user.stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
        custom_fields: [
          {
            name: "Fiscal name",
            value: `${
              payload.fiscalName.length !== 0 ? payload.fiscalName : "-----"
            }`,
          },
          {
            name: "Direction",
            value: `${
              payload.direction.length !== 0 ? payload.direction : "-----"
            }`,
          },
          {
            name: "NIF-IVA",
            value: `${payload.nif.length !== 0 ? payload.nif : "-----"}`,
          },
        ],
      },
    });

    // Create the subscription
    const userStripe = await User.findOne({
      stripeCustomerId: user.stripeCustomerId,
    });

    let subscription;

    if (userStripe.subId) {
      subscription = await stripe.subscriptions.create({
        customer: user.stripeCustomerId,

        items: [
          {
            price: PLANES[plan].id,
            tax_rates: [process.env.STRIPE_IVA_KEY],
          },
        ],
      });
    } else {
      subscription = await stripe.subscriptions.create({
        customer: user.stripeCustomerId,
        coupon: coupon ? coupon : null,
        items: [
          {
            price: PLANES[plan].id,
            tax_rates: [process.env.STRIPE_IVA_KEY],
          },
        ],
        trial_period_days: 30,
        proration_behavior: "none",
      });
    }

    var expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);

    // This is for add the payment record to the user
    let {payments} = await getUserById(user._id);
    payments.push({
      charge_date: new Date(Date.now()),
      plan,
      price: PLANES[plan].price,
    });

    userInfo = await updateUser(user._id, {
      sub: plan,
      allowedLawyers: PLANES[plan].allowedLawyers,
      expiration: expiryDate,
      payments,
      subDate: Date.now(),
      churn: null,
      subId: subscription.id,
      billing: {
        fiscalName: payload.fiscalName,
        direction: payload.direction,
        nif: payload.nif,
      },
    });

    // Now I should change the status of the website to visible
    const website = await getWebsiteByUserId(user._id);
    if (website) {
      await updateWebsite(website._id, {
        visible: true,
        allowedLawyers: PLANES[plan].allowedLawyers,
      });
    }
  } catch (error) {
    if (!error.raw) {
      return res.status(500).json({
        ok: false,
        data: "Error en el servidor: al intentar suscribirse al plan",
      });
    }

    const code = error.raw.code;
    const data = stripeErrors[code] || error.raw.message;
    return res.status(400).json({ok: false, data});
  }
  return res.json({ok: true, data: userInfo.email});
});

/**
 * FUNCION DAME DE BAJA
 */
router.put("/unsubscribe", async (req, res) => {
  try {
    await stripe.subscriptions.del(req.user.subId);
    await updateUser(req.user._id, {
      sub: null,
      allowedLawyers: null,
      churn: new Date(Date.now()),
    });
    const website = await getWebsiteByUserId(req.user._id);
    if (website) {
      await updateWebsite(website._id, {visible: false});
    }
    return res.json({ok: true});
  } catch (error) {
    return res
      .status(500)
      .json({ok: true, data: "Error al eliminar la suscripcion"});
  }
});

router.get("/products", async (req, res) => {
  try {
    stripe.products.list({limit: 3}, function (err, products) {
      if (err) {
        return res.json({ok: false, data: err});
      }

      return res.json({ok: true, data: products.data});
    });
  } catch (error) {
    return res.status(500).json({ok: true, data: error});
  }
});

router.get("/prices", async (req, res) => {
  try {
    stripe.prices.list({limit: 999}, function (err, price) {
      if (err) {
        return res.json({ok: false, data: err});
      }

      return res.json({ok: true, data: price.data});
    });
  } catch (error) {
    return res.status(500).json({ok: false, data: error});
  }
});

module.exports = router;
