const { body } = require("express-validator");
module.exports.ratingvalidation = [
  body("rating")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Rating is required"),
];