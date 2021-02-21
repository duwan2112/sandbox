const express = require("express");
const Stripe = require("stripe");
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

const {createSession} = require("../../database/sessions");

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

  console.log(amount);

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
  const {order, id} = req.body;

  if (order.invest < MIN_INVEST) {
    return res
      .status(404)
      .json({ok: false, data: "Mínimo de inversión son 10€"});
  }

  const amount = order.invest * 100;

  const campaign = await getCampaignByUserId(req.user._id);
  if (campaign)
    return res.status(400).json({
      ok: false,
      data: "El  usuario ya tiene una campaña no se puede crear otra",
    });

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "EUR",
      description: "Campaign",
      payment_method: id,
      confirm: true,
    });

    await createCampaign(req.user._id, {
      ...order,
      payments: [{charge_date: new Date(Date.now()), amount: amount / 100}],
    });
  } catch (error) {
    if (!error.raw) {
      return res.status(400).json({ok: false, data: error});
    }

    const code = error.raw.code;
    const data = stripeErrors[code] || error.raw.message;
    return res.status(400).json({ok: false, data});
  }
  return res.json({ok: true, data: "correcto"});
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
        .json({ok: false, data: "Error al intentar actualizar su campaña"});
    }

    // Hacer el cambio de tarjeta en caso que haya seleccionado un nuevo metodo de pago
    const {id} = req.body;
    if (id) {
      const amount = req.body.order.invest * 100;
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "EUR",
        description: "Campaign",
        payment_method: id,
        confirm: true,
      });
      await updateCampaign(campaign._id, req.body.order);
      return res.json({
        ok: true,
        data: "Tú campaña y método de pago se han actualizado con éxito",
      });
    }

    // Se pone en pausa la suscripcion Si la inversion es 0
    const {invest} = req.body.order;
    if (invest <= PAUSE_INVEST) {
      await deleteCampaign(campaign._id);
      return res.json({ok: true, data: "Su campaña se ha puesto en pausa"});
    }

    // Tengo que validar que la inversion sea de > 10
    if (invest < MIN_INVEST) {
      return res.json({ok: false, data: "Mínimo de inversión son 10€"});
    }

    await updateCampaign(campaign._id, req.body.order);
    return res.json({ok: true, data: "Cambios realizados con éxito"});
  } catch (error) {
    if (!error.raw) {
      return res.status(500).json({ok: false, data: error});
    }

    const code = error.raw.code;
    const data = stripeErrors[code] || error.raw.message;
    return res.status(500).json({ok: false, data});
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
 * PLAN SUBSCRIPTION ROUTE
 * req.body{
 *  id = id of transation
 *  plan = plan to be susbcribing
 * }
 */
router.post("/plan", async (req, res) => {
  const {id, plan} = req.body;
  const user = req.user;

  // Validar el plan del usuario con la cantidad de abogados que tiene registrado

  const {prices} = await getCMS();

  if (!prices) {
    return res
      .status(404)
      .json({ok: false, data: "No se han inizializado los precios"});
  }

  const PLANES = {
    autonomo: {
      price: prices.autonomo,
      allowedLawyers: 1,
    },
    asociados: {
      price: prices.asociados,
      allowedLawyers: 2,
    },
    bufete: {
      price: prices.bufete,
      allowedLawyers: 9999,
    },
  };

  const lawyers = await getLawyersByUserId(user._id);
  if (lawyers >= 0) {
    if (PLANES[plan].allowedLawyers < lawyers) {
      return res.status(400).json({
        ok: false,
        data:
          "La cantidad de abogados que tienes registrados es mayor a la permitida por el plan que seleccionaste, sugerimos seleccionar otro plan o eliminar abogados de tu sitio web",
      });
    }
  } else {
    return res.status(500).json({
      ok: false,
      data:
        "Hubo un error al momento de realizar el pago,ningun cargo fue realizado",
    });
  }

  const amount = Math.round(Number(PLANES[plan].price) * 100);

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "EUR",
      description: `${plan} subscription`,
      payment_method: id,
      confirm: true,
    });

    var expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);

    // This is for add the payment record to the user
    let {payments} = await getUserById(user._id);
    payments.push({
      charge_date: new Date(Date.now()),
      plan,
      price: PLANES[plan].price,
    });

    await updateUser(user._id, {
      sub: plan,
      allowedLawyers: PLANES[plan].allowedLawyers,
      expiration: expiryDate,
      payments,
      subDate: Date.now(),
      churn: null,
    });

    // Now I should change the status of the website to visible
    const website = await getWebsiteByUserId(user._id);
    if (website) {
      await updateWebsite(website._id, {visible: true});
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
  return res.json({ok: true, data: "success"});
});

/**
 * FUNCION DAME DE BAJA
 */
router.put("/unsubscribe", async (req, res) => {
  try {
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

module.exports = router;
