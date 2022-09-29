const { Router } = require("express");
const router = Router();
const Orders = require("../controllers/OrderController")
const Authorization = require("../services/Authorization");

router.get('/orders', Authorization.authorized, Orders.getOrders);

router.get('/order-details/:id', Authorization.authorized, Orders.orderDetails);

router.put('/order-deliver/:id', Authorization.authorized, Orders.deliverOrder)

module.exports = router;
