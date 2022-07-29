const express = require('express');
const router  = express.Router();
//We Use express-validator as a middleware , validation
const {register,login} = require('../controllers/UserController')
const {registervalidation,loginvalidation} = require('../validations/UserValidation')

//User Register API
router.post("/register", registervalidation , register); //Write in sequence means first validation check then register controller called

//Login Route
router.post("/login",loginvalidation,login);

module.exports = router;