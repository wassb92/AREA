const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/api/google');

// @route  login with google
router.post('/google/login', controllers.login);

module.exports = router
