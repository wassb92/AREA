const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/api/microsoft');

router.post('/microsoft/login', controllers.login);

module.exports = router;