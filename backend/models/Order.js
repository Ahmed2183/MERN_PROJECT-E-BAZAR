const { model, Schema, Types } = require('mongoose');

const orderSchema = Schema({
    productId: { type: Types.ObjectId, ref: 'product' },  //-->This means relation with product model schema/collection means add product id in order model/collection, check product name in Product model
    userId: { type: Types.ObjectId, ref: 'users' }, //-->This means relation with users model schema/collection means add user id in order model/collection, check users name in User model
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
    status: {  //-->Check order is shift or not
        default: false,
        type: Boolean
    },
    received: { //-->Check customer naa order received kia ha ya nahi
        default: false,
        type: Boolean
    },
    review: { //-->Check customer naa order received kia ha ya nahi
        default: false,
        type: Boolean
    },
}, { timestamps: true }
);
module.exports = model('order', orderSchema);

