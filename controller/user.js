const User =  require('../models/users');
const Course = require('../models/course');
const Attendance = require('../models/attendance');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

exports.getLogin = (req, res) => {
    res.render('login');
}

exports.login = async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });
    if(!user)  return res.status(400).send('Email not found');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password');

    
    const token = jwt.sign({_id: user._id, email: user.email}, process.env.TOKEN_SECRET);
    console.log(token);
    req.session.authtoken = token;
    res.redirect('/user/home');
    // res.send(token);
}

exports.home = (req, res) => {
    console.log(req.user);
    res.render('dashboard');
}

exports.attendance = async (req, res) => {
    const { email } = req.user;
    const user = await User.findOne({ email });
    const attendanceResult = await Promise.all(user.courses.map( async (e) => {
        const course = await Course.findOne({ courseName: e });
        const attendance = await Attendance.findOne({ email, courseName: e });  
        return {
            courseName: e,
            totalClasses: course.totalClasses,
            classesAbsent: attendance.classesAbsent
        };
    }));
    res.send(attendanceResult); 
}
exports.timetable = async (req, res) => {
    res.render('timetable');
}

exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect('login');
    })
}