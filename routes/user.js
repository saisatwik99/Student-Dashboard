const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

const userController = require('../controller/user');

router.get('/login', userController.getLogin);
router.post('/login', userController.login);
router.get('/home',verify, userController.home);
router.get('/attendance',verify, userController.attendance);
router.get('/timetable', verify, userController.timetable);
router.get('/library', verify, userController.library);
// router.get('/results', verify, userController.results);
router.get('/alumninetwork', verify, userController.alumninetwork);
router.get('/opportunity', verify, userController.opportunity);
router.post('/studentRequests/create', verify, userController.studentRequestsCreate);
router.get('/studentRequests/create', verify, userController.studentRequestsCreateGet);
router.get('/studentRequests/get', verify, userController.studentRequestsGet);
router.post('/complaint/create', verify, userController.complaintCreate);
router.get('/complaint/create', verify, userController.complaintCreateGet);
router.get('/complaint/get', verify, userController.complaintGet);
router.get('/almanac', verify, userController.almanac);
router.get('/studyMaterial', verify, userController.studyMaterial);
router.post('/logout', userController.logout);

module.exports = router;