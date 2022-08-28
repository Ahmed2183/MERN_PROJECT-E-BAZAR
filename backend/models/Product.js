const {model, Schema} = require('mongoose');

const productSchema = new Schema({

    title: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    discount: {
        required: true,
        type: Number
    },
    stock: {
        required: true,
        type: Number
    },
    category: {
        required: true,
        type: String
    },
    colors: {  //[Map] -> [] means array and Map means object we have object in array 
        type: [Map]
    },
    sizes: {
        type: [Map]
    },
    image1: {
        required: true,
        type: String
    },
    image2: {
        required: true,
        type: String
    },
    image3: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
},{timestamps: true}
);
module.exports = model('product',productSchema);