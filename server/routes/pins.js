const router = require("express").Router();
const pinControllers = require("../controllers/pin");

router.post("/", pinControllers.createPin);

router.get("/", pinControllers.getPins);

module.exports = router;
