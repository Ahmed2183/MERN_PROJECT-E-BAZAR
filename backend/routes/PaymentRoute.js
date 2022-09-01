const { Router } = require("express");
const router = Router();
const Payment = require("../controllers/PaymentController")

/* This Route Is From Stripe Document */
router.post('/create-checkout-session', Payment.paymentProcess);

module.exports = router;