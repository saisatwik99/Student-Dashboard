const User =  require('../models/users');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });
    if(!user)  return res.status(400).send('Email not found');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password');

    //Create and assign a token
    const token = jwt.sign({_id: user._id, email: user.email}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
}

exports.home = (req, res) => {
    res.send(req.user);
}