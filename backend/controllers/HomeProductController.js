const ProductModel = require("../models/Product");

class HomeProducts {
  async categoryProducts(req, res) {
    const { name, page, keyword } = req.params;
    // console.log(name, page);
    const perPage = 12;
    const skiprecord = (page - 1) * perPage;

    //Search Product Code Line const options = .....
    const options = name ? { category: name } : keyword && { title: { $regex: `${keyword}`, $options: "i" } }; //i means keyword in both uper and lower case

    if (page) {
      try {
        const count = await ProductModel.find({ ...options, }).where("stock").gt(0).countDocuments(); // gt means greater then means get stock which is > 0
        const response = await ProductModel.find({ ...options, }).where("stock").gt(0).skip(skiprecord).limit(perPage).populate("reviews").sort({ updatedAt: -1 });  //.populate("reviews") means show all fields of review model
        // console.log(response);
        return res.status(200).json({ products: response, perPage, count });
      } catch (error) {
        console.log(error.message);
      }
    }
    else {
      const response = await ProductModel.find({ ...options, }).where("stock").gt(0).limit(4).populate("reviews").sort({ updatedAt: -1 }); //onlys 4 product show on Home Page limit is 4
      return res.status(200).json({ products: response });
    }
  }
}

module.exports = new HomeProducts();