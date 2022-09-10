const express = require("express");
const stripe = require('stripe');
const router = express.Router();
const Payment = require("../controllers/PaymentController")

/* This Route Is From Stripe Document */
router.post('/create-checkout-session', Payment.paymentProcess);

/* This Route Is From Listen to Stripe events page in Stripe, But i copy this code from github of shakilkhan bcz stripe code is not working  */
router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    (request, response) => {
        const sig = request.headers["stripe-signature"];

        let event;
        try {
            event = stripe.webhooks.constructEvent(
                request.rawBody,  //In Stripe Code we have request.body, but we used  request.rawBody, bcz request.body, not working
                sig,
                process.env.ENDPOINTSECRET
            );
        } catch (err) {
            console.log(err.message);
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        // Handle the event
        switch (event.type) {
            case "payment_intent.succeeded":
                const paymentIntent = event.data.object;
                // Then define and call a function to handle the event payment_intent.succeeded
                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        // Return a 200 response to acknowledge receipt of the event
        response.send();
    }
);


module.exports = router;