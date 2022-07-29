const { body } = require('express-validator'); //For Validation

module.exports.productvalidation =
    [
        body("title").not().isEmpty().trim().escape().withMessage("Title is Required"),
        body("price").custom((value) => {
            if (parseInt(value) < 1) {
                throw new Error('Price should be above $1');
            }
            else if (value === "") {
                throw new Error('Price is Required"');
            }
            else {
                return parseInt(value);
            }
        }).trim().escape(),
        body("discount", "Discount should not be negative").isInt({ min: 0 }).not().isEmpty().trim().escape().withMessage("Discount is Required"),
        // body("discount").custom((value) => {
        //     if (Number(value) < 0 ) {
        //         throw new Error('Discount should not be negative');
        //     }
        //     else if(value === "")
        //     {
        //         throw new Error('Discount is Required"');
        //     }
        //     else
        //     {
        //         return (value);
        //     }
        // }).trim().escape(),
        body("stock").custom((value) => {
            if (parseInt(value) < 20) {
                throw new Error('Stock must be above 20');
            }
            else if (value === "") {
                throw new Error('Stock is Required"');
            }
            else {
                return parseInt(value);
            }
        }).trim().escape(),
        body("category").not().isEmpty().trim().escape().withMessage("Category is Required"),

    ] 