const { default: mongoose } = require('mongoose');
const { model, Schema } = require('mongoose');

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
    // We take reviews field in array [] bcz eik product mai multiple reviews hoskaty hai, We also import Types on above in mongoose
    reviews: [{ type: mongoose.Types.ObjectId, ref: 'review' }],  //-->This means relation with review model schema/collection means add review id in product model/collection, check review name in Review model
}, { timestamps: true }
);
module.exports = model('product', productSchema);