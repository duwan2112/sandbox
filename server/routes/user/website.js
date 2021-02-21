const express = require("express");
const yup = require("yup");
const Stripe = require("stripe");
const {Website} = require("../../database/schema");
const {
  getWebsiteByUserId,
  getWebsiteById,
  updateWebsite,
  getWebsiteByUrl,
  createWebsite,
} = require("../../database/website");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const {getUserById, updateUser} = require("../../database/user");

const validationSchema = require("../../database/website/validationSchema");

const urlValidation = yup
  .string()
  .matches(/^[a-z._-]+$/)
  .min(5)
  .max(30)
  .required();

const router = express.Router();

router.get("/getWebsite/:id", async (req, res) => {
  const website = await getWebsiteByUserId(req.params.id);
  console.log(website);
  if (website) {
    res.status(200).json({ok: true, data: website});
  } else {
    res.status(404).json({ok: false, data: "No existen Website"});
  }
});

router.put(["/sections", "/sections/:userid"], async (req, res) => {
  const userId = req.params.userid || req.user._id;
  // Get the data
  const website = await getWebsiteByUserId(userId);

  let updatedWebsite;

  if (website) {
    // Primer if, verifica si la request es para actualizar o crear
    let newArea;

    switch (req.body.type) {
      case "create":
        newArea = {
          $push: {[`${req.body.filter}`]: [req.body.data]},
        };

        updatedWebsite = await updateWebsite(website._id, newArea);

        break;
      case "update":
        let send;
        if (req.body.filter === "areas") {
          send = {
            $set: {
              "areas.$": {
                area: req.body.data.area,
                id: req.body.data.id,
                cases: [
                  {
                    subarea: req.body.data.cases[0].subarea,
                    comment: req.body.data.cases[0].comment,
                  },
                ],
              },
            },
          };
        } else if (req.body.filter === "blogs") {
          send = {
            $set: {
              "blogs.$": {
                area: req.body.data.area,
                question: req.body.data.question,
                answer: req.body.data.answer,
                id: req.body.data.id,
              },
            },
          };
        } else if (req.body.filter === "solvedCases") {
          send = {
            $set: {
              "solvedCases.$": {
                area: req.body.data.area,
                title: req.body.data.title,
                comment: req.body.data.comment,
                honors: req.body.data.honors,
                id: req.body.data.id,
              },
            },
          };
        }

        updatedWebsite = await Website.updateOne(
          {_id: website._id, [`${req.body.filter}.id`]: req.body.data.id},
          send
        );
        break;
      case "remove":
        updatedWebsite = await Website.updateOne(
          {_id: website._id, [`${req.body.filter}.id`]: req.body.data},
          {$pull: {[`${req.body.filter}`]: {id: req.body.data}}}
        );

        break;

      case "none":
        updatedWebsite = await updateWebsite(website._id, {
          [`${req.body.filter}`]: req.body.data,
        });
        break;

      default:
        updatedWebsite = await updateWebsite(website._id, req.body);
        break;
    }

    if (updatedWebsite) {
      return res
        .status(200)
        .json({ok: true, data: await getWebsiteByUserId(userId)});
    } else {
      return res
        .status(500)
        .json({ok: false, data: "no se pudo actualizar el sitio web"});
    }
  } else {
    return res.status(400).json({ok: false, data: "Bad request data"});
  }
});

router.put(["/", "/:userid"], async (req, res) => {
  const userId = req.params.userid || req.user._id;
  // Get the data
  const website = await getWebsiteByUserId(userId);

  if (website) {
    // Primer if, verifica si la request es para actualizar o crear
    if (!website.basic) {
      if (req.body.basic && req.body.basic.url) {
        const isUrl = await getWebsiteByUrl(req.body.basic.url);

        if (isUrl)
          return res.status(400).json({
            ok: false,
            data: "La dirección web esta siendo utilizada por otro usuario",
          });

        const infoUser = await getUserById(website.userId);
        const {email, referral_link} = infoUser;
        const customer = await stripe.customers.create({
          email,
        });
        console.log(customer);
        await updateUser(website.userId, {stripeCustomerId: customer.id});
        await updateWebsite(website._id, {url: req.body.basic.url});
      }
    } else {
      if (
        req.body.basic &&
        req.body.basic.url &&
        website.url !== req.body.basic.url
      ) {
        const isUrl = await getWebsiteByUrl(req.body.basic.url);
        if (isUrl)
          return res.status(400).json({
            ok: false,
            data: "La dirección web esta siendo utilizada por otro usuario",
          });
        await updateWebsite(website._id, {url: req.body.basic.url});
      }
    }

    validationSchema
      .validate(req.body)
      .then(async () => {
        // Si no se ha enviado nada data website.basic.bufeteName = undefined
        // console.log("Todos los campos son validos, actualizando...");
        updateWebsite(website._id, {isCompleted: true});
      })
      .catch(async (err) => {
        // console.log(err);
      });

    const updatedWebsite = await updateWebsite(website._id, req.body);

    if (updatedWebsite) {
      return res
        .status(200)
        .json({ok: true, data: await getWebsiteByUserId(userId)});
    } else {
      return res
        .status(500)
        .json({ok: false, data: "no se pudo actualizar el sitio web"});
    }
  } else {
    return res.status(400).json({ok: false, data: "Bad request data"});
  }
});

router.get(["/", "/:userid"], async (req, res) => {
  const userId = req.params.userid || req.user._id;

  let website = await getWebsiteByUserId(userId);
  try {
    if (!website) {
      const newWebsite = await createWebsite({userId: userId});
      return res
        .status(200)
        .json({ok: true, data: {initialValues: newWebsite}});
    } else {
      return res
        .status(200)
        .json({ok: true, data: {initialValues: website, user: req.user}});
    }
  } catch (error) {
    return res
      .status(500)
      .json({ok: false, data: "Error al obtener el sitio web"});
  }
});

module.exports = router;
