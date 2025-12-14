const router = require("express").Router();
const c = require("../controllers/sweet.controller");
const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/role.middleware");

router.post("/", auth, admin, c.create);
router.get("/", auth, c.getAll);
router.get("/search", auth, c.search);
router.put("/:id", auth, admin, c.update);
router.delete("/:id", auth, admin, c.remove);

module.exports = router;
