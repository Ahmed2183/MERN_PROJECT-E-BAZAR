const { body } = require('express-validator'); //For Validation

//For Register Validation
module.exports.registervalidation = [
    body("name").not().isEmpty().trim().escape().withMessage("Name is Required"),
    body("email").isEmail().normalizeEmail().escape().withMessage("Email is Required"),
    body("password").isLength({min:6}).withMessage("Password must be 6 characters long"),
];

//Code is used For Login Validation
module.exports.loginvalidation = [
    body("email").isEmail().normalizeEmail().escape().withMessage("Email is Required"),
    body("password").not().isEmpty().withMessage("Password is Required"),
];