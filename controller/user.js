const User =  require('../models/users');
const Course = require('../models/course');
const Attendance = require('../models/attendance');
const Opportunity = require('../models/opportunity');
const Alumni = require('../models/alumni');
const StudentRequest = require('../models/studentRequests');
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

exports.home = async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    res.render('dashboard', {name: user.firstName});
}

exports.attendance = async (req, res) => {
    const { email } = req.user;
    const user = await User.findOne({ email });
    const attendanceResult = await Promise.all(user.courses.map( async (e, index) => {
        const course = await Course.findOne({ courseName: e });
        const attendance = await Attendance.findOne({ email, courseName: e });
        const allColors = ["#23afe3", "#a7d212", "#ff4241", "#edc214"]  
        return {
            courseName: e,
            "Present": course.totalClasses - attendance.classesAbsent,
            "Absent": attendance.classesAbsent,
            "Total": course.totalClasses,
            "Percent": Math.floor(( (course.totalClasses - attendance.classesAbsent)*100/course.totalClasses)),
            "color": allColors[index%4]

        };
    }));
    console.log(attendanceResult);
    res.render("attendance", {name: user.firstName, info: attendanceResult}); 
}
exports.timetable = async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    res.render('timetable', {name: user.firstName});
}

exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect('login');
    })
}

exports.library = async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    res.render("library", {name: user.firstName});
}

exports.results = async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    res.render("results", {name: user.firstName});
}

exports.alumninetwork = async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    const alumni = await Alumni.find();
    res.render("alumninetwork", {name: user.firstName, alumni});
}

exports.opportunity = async (req, res) => {
    const result = await Opportunity.find();
    const user = await User.findOne({ email: req.user.email });
    res.render("opportunity", { info: result, name: user.firstName });
}

exports.studentRequestsCreate = async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    const { title, description, tags } = req.body;
    const DATE = new Date();
    const date = DATE.getDate() +'-' + (DATE.getMonth()+1) + '-'+  DATE.getFullYear();
    const result = await StudentRequest.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        date,
        title,
        description,
        tags
    });
    res.send(result);
}

exports.studentRequestsGet = async (req, res) => {
    const { query } = req.params;
    const user = await User.findOne({ email: req.user.email });
    let result;
    if( query === 'ALL') {
        result = await StudentRequest.find({
            email: user.email
        });
    } else {
        result = await StudentRequest.find({
            email: user.email,
            status: query
        });
    }
    res.send(result);
}