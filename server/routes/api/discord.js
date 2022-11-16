const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/api/discord");

router.post("/discord/login", controllers.login);

module.exports = router;
