const stripe = require('stripe')(process.env.STRIPE_KEY);
const User = require('../models/User')

class PaymentController {

    async paymentProcess(req, res) {

        const { cart, id } = req.body; //-->From paymentServices.js
        // console.log(id);

        const user = await User.findOne({ _id: id });
        // console.log(user);

        if (!user) {
            return res.status(404).json({ errors: "User Not Found" });
        }

        const session = await stripe.checkout.sessions.create({
            shipping_address_collection: {
                allowed_countries: ['PK', 'IN', 'BD'],  //--> Here we shipping only three countries Pakistan, India and Bangladesh
            },

            customer_email: user.email,  //-->Display user email on stripe form

            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'usd',
                        },
                        display_name: 'Free shipping',
                        // Delivers between 5-7 business days
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        }
                    }
                },
            ],

            line_items: cart.map(item => {

                let actualPrice = item.price - item.discount;
                actualPrice = parseFloat(actualPrice);
                actualPrice = actualPrice * 100;
                actualPrice = actualPrice.toFixed(1); //--> toFixed(1) means show only one digit after point

                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.title,
                        },
                        unit_amount_decimal: actualPrice,
                    },
                    quantity: item.quantity,
                }
            }),
            mode: 'payment',
            success_url: `${process.env.CLIENT}/user`,  //-->If Payment Succes redirect to home url
            cancel_url: `${process.env.CLIENT}/cart`, //-->If Payment Cancel redirect to cart url
        });

        res.json({ url: session.url });
    }
}

module.exports = new PaymentController();