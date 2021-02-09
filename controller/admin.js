const User =  require('../models/users');
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
        branch
    } = req.body;

    const emailExist = await User.findOne({email});
    if(emailExist) return res.status(400).send('Email already exists');

    // Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        const result = await User.create({ 
            firstName, lastName, email, password: hashPassword,
            gender, phoneNumber, batch, branch
        });
        res.send(result);
    }
    catch(err) {
        res.status(400).send(err);
    }
}