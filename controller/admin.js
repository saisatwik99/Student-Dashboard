const User =  require('../models/users');
const Alumni = require('../models/alumni');
const Course = require('../models/course');
const Attendance = require('../models/attendance');
const Opportunity = require('../models/opportunity');
const bcrypt = require('bcryptjs'); 

exports.addStudent = async (req, res, next) => {
    const { 
        firstName,
        lastName,
        email,
        password,
        gender,
        phoneNumber,
        batch,
        branch,
        semester,
        courses
    } = req.body;

    const emailExist = await User.findOne({email});
    if(emailExist) return res.status(400).send('Email already exists');

    // Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        const result = await User.create({ 
            firstName, lastName, email, password: hashPassword,
            gender, phoneNumber, batch, branch, semester, courses
        });
        courses.map( async (e) => {
            await Attendance.create({
                email: email,
                courseName: e,
                classesAbsent: 0
            });
        });
        res.send(result);
    }
    catch(err) {
        res.status(400).send(err);
    }
}

exports.addAlumni = async (req, res, next) => {
    const {
        fullName,
        email,
        linkedln,
        role,
        image
    } = req.body;

    const emailExist = await Alumni.findOne({email});
    if(emailExist) return res.status(400).send('Alumni with this email already exists');

    try {
        const result = await Alumni.create({ 
            fullName, email, linkedln, role, image
        });
        res.send(result);
    }
    catch(err) {
        res.status(400).send(err);
    }
}

exports.addCourse = async (req, res, next) => {
    const {
        courseName,
        totalStudents,
        totalClasses
    } = req.body;

    const courseExist = await Course.findOne({courseName});
    if(courseExist) return res.status(400).send('Course already exists');

    try {
        const result = await Course.create({ 
            courseName, totalStudents, totalClasses
        });
        res.send(result);
    }
    catch(err) {
        res.status(400).send(err);
    }
}

exports.addOpportunity = async(req, res, next) => {
    try {
        const result = await Opportunity.create(req.body);
        res.send(result);
    }
    catch(err) {
        res.status(400).send(err);
    }
}

exports.login = (req, res) => {
    res.render('adminlogin');    
}