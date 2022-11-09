const { model, Schema, Types } = require('mongoose');

const reviewSchema = Schema({
    rating: {
        type: Number,
        default: 1,
    },
    comment: {
        type: String,
    },
    product: { type: Types.ObjectId, ref: 'product' },  //-->This means relation with product model schema/collection means add product id in review model/collection, check product name in Product model
    user: { type: Types.ObjectId, ref: 'users' }, //-->This means relation with users model schema/collection means add user id in review model/collection, check users name in User model
}, { timestamps: true }
);
module.exports = model('review', reviewSchema);

