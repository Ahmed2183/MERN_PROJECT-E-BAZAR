const { model, Schema, Types } = require('mongoose');

const orderSchema = Schema({
    productId: { type: Types.ObjectId, ref: 'product' },  //-->This means relation with product model schema/collection means add in product model/collection
    userId: { type: Types.ObjectId, ref: 'user' }, //-->This means relation with user model schema/collection means add in user model/collection
    size: {
        required: false,  //-->This means optional
        type: String
    },
    color: {
        required: false,  //-->This means optional
        type: String
    },
    quantities: {
        required: true,
        type: Number
    },
    address: {  //-->In address we have shiping data
        required: true,
        type: Map  //-->Map means object
    },
},{timestamps: true}
);
module.exports = model('order',orderSchema);

