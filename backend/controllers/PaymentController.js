const stripe = require('stripe')(process.env.STRIPE_KEY);
const User = require('../models/User')
const OrderModel = require('../models/Order')
const ProductModel = require('../models/Product')

/* For Run Stripe in backend folder: stripe listen --forward-to localhost:5000/webhook */
class PaymentController {

    async paymentProcess(req, res) {

        const { cart, id } = req.body; //-->From paymentServices.js
        // console.log(id);

        const user = await User.findOne({ _id: id });
        // console.log(user);

        if (!user) {
            return res.status(404).json({ errors: "User Not Found" });
        }

        const orderData = cart.map(item => {
            return {   //Stripe mai limit ha data pass krna ki zyada data pass nhi krstay sirf 40 keys means jo values pass kray ga uski limit 500 characters hogi sirf
                _id: item._id,
                size: item.size,
                color: item.color,
                quantity: item.quantity,
                userId: user._id,
            }
        })

        const customer = await stripe.customers.create({
            email: user.email,
            metadata: {  // metadata means if we have extra data and we append(add) in this inside object then we use metadata
                cart: JSON.stringify(orderData),
            }
        })

        const session = await stripe.checkout.sessions.create({
            shipping_address_collection: {
                allowed_countries: ['PK', 'IN', 'BD'],  //--> Here we shipping only three countries Pakistan, India and Bangladesh
            },

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
            customer: customer.id,  //-->In Stripe sab sa phela customer create hota ha phr ham customer object sa id access krsktay hai
            mode: 'payment',
            success_url: `${process.env.CLIENT}/user?session_id={CHECKOUT_SESSION_ID}`,  //-->If Payment Succes redirect to user url with session_id, here session_id={CHECKOUT_SESSION_ID} is stripe built-in varibale
            cancel_url: `${process.env.CLIENT}/cart`, //-->If Payment Cancel redirect to cart url
        });

        res.json({ url: session.url });
    }

    /* This Code Is From Listen to Stripe events page in Stripe, But i copy this code from github of shakilkhan bcz stripe code is not working  */

    async checkOutSession(request, response) {
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

            case 'checkout.session.completed':
                const data = event.data.object;
                let customer = await stripe.customers.retrieve(data.customer);
                // console.log("Customer:", customer);
                customer = JSON.parse(customer?.metadata?.cart);
                customer.forEach(async cust => {
                    try {
                        let reviewStatus = false;
                        const findOrder = await OrderModel.findOne({productId: cust._id,userId: cust.userId}).where('review').equals(true);
                        if(findOrder) {
                            reviewStatus = true;
                        }
                        await OrderModel.create({
                            productId: cust._id, //-->In cust._id we have product id from product model/collection
                            userId: cust.userId, //-->In cust.userId we have user id from user model/collection
                            size: cust.size,
                            color: cust.color,
                            quantities: cust.quantity,
                            address: data.customer_details.address,
                            review: reviewStatus
                        });
                        const product = await ProductModel.findOne({ _id: cust._id })
                        if (product) {
                            let stock = product.stock - cust.quantity;  //-->Checkout ka baad jitni quantity checkout mai hogi utni stock sa minus hojai gi r Product update hojai ga
                            if (stock < 0) {
                                stock = 0;
                            }
                            await ProductModel.findByIdAndUpdate(cust._id, { stock }, { new: true }) //--> new: true  means update new data/record and show new record/data
                        }
                    } catch (error) {
                        console.log(error.message);
                        return response.status(500).json('Server Internal Error');
                    }
                })
                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        // Return a 200 response to acknowledge receipt of the event
        response.send();
    }

    async paymentVerify(req, res) {
        const { id } = req.params;
        try {
            const session = await stripe.checkout.sessions.retrieve(id);
            return res.status(200).json({ msg: "Payment Verified Successfully", status: session.payment_status })
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new PaymentController();