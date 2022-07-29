const {model, Schema} = require('mongoose');

const categorySchema = new Schema(
{
    name: {
        type: String,
        required: true,
        unique: true  //means name unique hoga double/same name nhi hoga
    },
}, {timestamps: true} //Add time in database when category is created
);
module.exports = model('categories',categorySchema);  //Mongo automatically create table