const User =  require('../models/users');
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

    //Create and assign a token
    const token = jwt.sign({_id: user._id, email: user.email}, process.env.TOKEN_SECRET);
    req.session.authtoken = token;
    res.redirect('/user/home');
    // res.send(token);
}

exports.home = (req, res) => {
    console.log(req.user);
    res.render('dashboard');
}

exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect('login');
    })
}