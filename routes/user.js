const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

const userController = require('../controller/user');

router.post('/login', userController.login);
router.get('/home',verify, userController.home);

module.exports = router;