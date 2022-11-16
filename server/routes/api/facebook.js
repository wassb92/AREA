const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/api/facebook");

router.post("/facebook/login", controllers.login);

module.exports = router;
