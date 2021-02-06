const express = require('express');
const router = express.Router();

const adminController = require('../controller/admin');

router.post('/add-student', adminController.addStudent);

module.exports = router;
