const router = require("express").Router();
const c = require("../controllers/inventory.controller");
const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/role.middleware");

router.post("/:id/purchase", auth, c.purchase);
router.post("/:id/restock", auth, admin, c.restock);

module.exports = router;
