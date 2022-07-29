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
    colors: {  //[Map] -> [] means object and Map means array we have array in object
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