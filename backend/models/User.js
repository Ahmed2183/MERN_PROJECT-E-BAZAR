const {model, Schema} = require('mongoose');

const userSchema = new Schema(
{
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
        default: false  //-->add admin:true in UserController.js when we add admin, 
        //If you want to add admin then write admin:true, in UserController.js
        //If you dont want to add admin then dont write admin in code remove them or comment them in UserController.js, admin:false in database
    },
},
{ timestamps: true}  //-->Current time also add in database when user register
);
module.exports = model('users',userSchema);