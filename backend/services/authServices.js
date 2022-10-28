const bcrypt = require("bcrypt"); //For HASH PASSWORD
const jwt = require("jsonwebtoken"); //For Token
const {JWT_SECRET} = require("../config/envConfig");

//For HASH PASSWORD
module.exports.hashedPassword = async (password) => {
    //Password not secure without Salt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

//For Token
module.exports.createToken = (userdata) => {
    return jwt.sign({userdata},"" + JWT_SECRET,{  
        expiresIn: '7d',
    });
}

//For Compare Password
module.exports.comparePassword = async (password, dbpassword) => {
return await bcrypt.compare(password,dbpassword);
}