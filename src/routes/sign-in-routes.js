const express = require('express');
const router = express.Router();
const credsController = require('../controllers/sign-in.controller');

router.post('/', credsController.signIn);

module.exports = router;