const { Router } = require("express");
const router = Router();
const Orders = require("../controllers/OrderController")
const Authorization = require("../services/Authorization");
const { ratingvalidation }  = require("../validations/RatingValidation");

router.get('/orders', Authorization.authorized, Orders.getOrders);

router.get('/order-details/:id', Authorization.authorized, Orders.orderDetails);

router.put('/order-update', Authorization.authorized, Orders.updateOrder);

router.post("/add-review", [Authorization.authorized, ratingvalidation], Orders.createRating);

module.exports = router;
