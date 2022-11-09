const OrderModel = require("../models/Order");
const ReviewModel = require("../models/Reviews");
const ProductModel = require("../models/Product");
const { validationResult } = require("express-validator");


class Orders {
    async getOrders(req, res) {
        const query = req.query;
        const perPage = 5;
        const skiprecord = (query.page - 1) * perPage;
        const option = query.userId ? { userId: query.userId } : {};
        try {
            const count = await OrderModel.find(option).countDocuments();
            const response = await OrderModel.find(option)
                /* In 1st populate we show product data and minus(-) sign jiska sth use horha h wo items show nhi krwai ga orders mai */
                .populate("productId", "-colors -sizes -createdAt -updatedAt -stock -image2 -image3")  //-->productId means orders mai jo productId ha ussi ka data show krwao
                /* In 2nd populate we show user data and skip some details */
                .populate("userId", "-password -updatedAt -createdAt -admin")
                .skip(skiprecord)
                .limit(perPage)
                .sort({ createdAt: -1 });  //-->Jis bi order mai jo b changes hngi wo sab sa phlea list mai show hoga e.g received hona deliver hona eassi changes
            // console.log(response);
            return res.status(200).json({ orders: response, perPage, count });
        } catch (error) {
            console.log(error.message);
        }
    }

    async orderDetails(req, res) {
        const { id } = req.params;
        try {
            const details = await OrderModel.findOne({ _id: id })
                .populate("productId", "-colors -sizes -createdAt -updatedAt -stock -image2 -image3")
                .populate("userId", "-password -updatedAt -createdAt -admin")
            return res.status(200).json({ details });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ errors: error });
        }
    }

    async updateOrder(req, res) {
        const { id, status } = req.query;
        let option = {};
        if (status === "delivered") {
            option = { status: true };
        }
        else if (status === "received") {
            option = { received: true };
        }
        try {
            const updateProduct = await OrderModel.findByIdAndUpdate(id, option, { new: true });
            return res.status(200).json({
                msg: status === 'delivered' ? 'Order Has Been Delivered' : status === 'received' && 'Order Received'
            });
        } catch (error) {
            return res.status(500).json({ errors: error.message });
        }
    }

    async createRating(req, res) {
        const errors = validationResult(req);
        const { rating, message, user, product, id } = req.body;   // ---> All get from ReviewForm.js through orderServices
        // console.log(req.body);
        if (errors.isEmpty()) {
            try {
                const createdReview = await ReviewModel.create({ rating: parseInt(rating), comment: message, product, user });  // --> Create Review
                //  console.log("Review Created:",createdReview);
                await OrderModel.findByIdAndUpdate(id, { review: true });  //--->Update review field from false to true
                await ProductModel.findOneAndUpdate({ _id: product }, { $push: { reviews: createdReview._id } });  //---> Store review id in reviews field array, $push is for to push data in array field
                return res.status(201).json({ msg: "Review Has Created Successfully" });
            } catch (error) {
                return res.status(500).json({ errors: error.message });
            }
        } else {
            return res.status(400).json({ errors: errors.array() });
        }
    }
}

module.exports = new Orders(); 