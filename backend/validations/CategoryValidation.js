const { body } = require('express-validator'); //For Validation

module.exports.categoryvalidation = [
    body("name").not().isEmpty().trim().escape().withMessage("Category is Required"),
]   