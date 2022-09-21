const { Router } = require("express");
const router = Router();
const Orders = require("../controllers/OrderController")

router.get('/orders/:page', Orders.getOrders);

module.exports = router;
