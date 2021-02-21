const express = require("express");
const router = express.Router();
const {Website, User} = require("../../database/schema");
const {sendCancelSubscription} = require("../../email");
router.post(
  "/webhook",

  async (request, response) => {
    let event;

    try {
      event = request.body;
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "customer.subscription.updated":
        const planes = [
          {
            name: "autonomo",
            allowedLawyers: 1,
            id: "price_1HbYL9AQ8xCsx4Jdk3oxqFig",
          },
          {
            name: "asociados",
            allowedLawyers: 2,
            id: "price_1HbYLpAQ8xCsx4Jdz8vFwUE0",
          },
          {
            name: "bufete",
            allowedLawyers: 9999,
            id: "price_1HbYMMAQ8xCsx4JdQhU3oBrE",
          },
        ];

        const subInfo = planes.filter(
          (plan) => plan.id === event.data.object.plan.id
        );

        const userInfo = await User.findOneAndUpdate(
          {subId: event.data.object.id},
          {
            sub: subInfo[0].name,
            subDate: Date(event.data.object.current_period_start),
            allowedLawyers: subInfo[0].allowedLawyers,
            expiration: Date(event.data.object.current_period_end),
          }
        );
        const webInfo = await Website.findOneAndUpdate(
          {userId: userInfo._id},
          {allowedLawyers: subInfo[0].allowedLawyers}
        );
        console.log(webInfo);
        break;
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      case "customer.subscription.deleted":
        const user = await User.findOneAndUpdate(
          {subId: event.data.object.id},
          {
            sub: null,
            subDate: Date(event.data.object.cancelet_at),
            allowedLawyers: null,
            expiration: null,
          }
        );
        const web = await Website.findOneAndUpdate(
          {userId: user._id},
          {visible: false, allowedLawyers: null}
        );
        await sendCancelSubscription(user.email, web.url);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.json({received: true});
  }
);

module.exports = router;
