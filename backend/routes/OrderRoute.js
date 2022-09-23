const { Router } = require("express");
const router = Router();
const Orders = require("../controllers/OrderController")
const Authorization = require("../services/Authorization");

router.get('/orders/:page', Authorization.authorized, Orders.getOrders);

module.exports = router;
