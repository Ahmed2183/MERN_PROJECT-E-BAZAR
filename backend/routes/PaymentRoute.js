const express = require("express");
const router = express.Router();
const Payment = require("../controllers/PaymentController")

/* This Route Is From Stripe Document */
router.post('/create-checkout-session', Payment.paymentProcess);

/* This Route Is From Listen to Stripe events page in Stripe, But i copy this code from github of shakilkhan bcz stripe code is not working  */
router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    Payment.checkOutSession
);


module.exports = router;