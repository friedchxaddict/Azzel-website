const express = require("express");
const router = express.Router();

const orderControllers = require("../controllers/orderControllers");

const auth = require("../auth");
const {verify,verifyAdmin} = auth;

router.post("/",verify,orderControllers.addOrder);

router.get("/getUserOrders",verify,orderControllers.getUserOrders);

router.get("/getAllOrders",verify,verifyAdmin,orderControllers.getAllOrders);


module.exports = router;