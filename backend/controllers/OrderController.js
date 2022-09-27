const OrderModel = require("../models/Order");


class Orders {
    async getOrders(req, res) {
        const { page } = req.params;
        const perPage = 5;
        const skiprecord = (page - 1) * perPage;
        try {
            const count = await OrderModel.find({}).countDocuments();
            const response = await OrderModel.find({})
                /* In 1st populate we show product data and minus(-) sign jiska sth use horha h wo items show nhi krwai ga orders mai */
                .populate("productId", "-colors -sizes -createdAt -updatedAt -stock -image2 -image3")  //-->productId means orders mai jo productId ha ussi ka data show krwao
                /* In 2nd populate we show user data and skip some details */
                .populate("userId", "-password -updatedAt -createdAt -admin")
                .skip(skiprecord)
                .limit(perPage)
                .sort({ updatedAt: -1 });
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

    async deliverOrder(req,res) {
        const { id } = req.params;
        try {
            const updateProduct = await OrderModel.findByIdAndUpdate(id, { status: true }, { new: true });
            return res.status(200).json({ msg: "Product Has Been Sent To Customer" });
        } catch (error) {
            return res.status(500).json({ errors: error.message });
        }
    }

}

module.exports = new Orders();