const User =  require('../models/users');

exports.addStudent = async (req, res, next) => {
    // const { 
    //     firstName,
    //     lastName,
    //     email,
    //     password,
    //     gender,
    //     phoneNumber,
    //     batch,
    //     branch
    // } = req.body;
    console.log(req.body);
    // const result = await User.create({ 
    //     firstName,
    //     lastName,
    //     email,
    //     password,
    //     gender,
    //     phoneNumber,
    //     batch,
    //     branch
    // });
    res.send("result");
}