const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

const userController = require('../controller/user');

router.get('/login', userController.getLogin);
router.post('/login', userController.login);
router.get('/home',verify, userController.home);
router.post('/logout', userController.logout);

module.exports = router;