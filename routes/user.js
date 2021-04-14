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
router.get('/results', verify, userController.results);
router.get('/alumninetwork', verify, userController.alumninetwork);
router.get('/opportunity', verify, userController.opportunity);
router.post('/studentRequests/create', verify, userController.studentRequestsCreate);
router.get('/studentRequests/get/:query', verify, userController.studentRequestsGet);
router.post('/logout', userController.logout);

module.exports = router;