const router = require("express").Router();
const c = require("../controllers/order.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/", auth, c.getMyOrders);

module.exports = router;
