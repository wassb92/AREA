const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/api/twitter');

router.post('/twitter/login', controllers.login);

module.exports = router;