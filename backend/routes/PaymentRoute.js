const { Router } = require("express");
const stripe = require('stripe')(process.env.STRIPE_KEY);
const router = Router();

/* This Route Is From Stripe Document */
router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT}`,  //-->If Payment Succes redirect to home url
      cancel_url:  `${process.env.CLIENT}/cart`, //-->If Payment Cancel redirect to cart url
    });
  
    res.json({ url: session.url });
  });

module.exports = router;