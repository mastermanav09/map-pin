const router = require("express").Router();
const authControllers = require("../controllers/auth");

router.put("/signup", authControllers.signup);

router.post("/login", authControllers.login);

module.exports = router;
