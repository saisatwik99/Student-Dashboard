const express = require('express');
const router = express.Router();

const adminController = require('../controller/admin');

router.post('/add-student', adminController.addStudent);
router.post('/addAlumni', adminController.addAlumni);
router.post('/addCourse', adminController.addCourse);
router.post('/addOpportunity', adminController.addOpportunity);
router.get('/login', adminController.login);

module.exports = router;
