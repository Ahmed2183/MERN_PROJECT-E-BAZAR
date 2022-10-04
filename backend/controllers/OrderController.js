const OrderModel = require("../models/Order");


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
}

module.exports = new Orders();