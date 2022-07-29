const { validationResult } = require("express-validator");
const CategoryModel = require("../models/Category");

//Create class, //Category is just name you use any name which you want
class Category {

  //For Category Controller
  //Code For POST Category 
  async Create(req, res) { //Create is function name

    const errors = validationResult(req);

    const { name } = req.body;

    if (errors.isEmpty()) {
      const nameExist = await CategoryModel.findOne({ name });
      if (!nameExist) {
        await CategoryModel.create({ name });
        return res.status(201).json({ msg: "Category Has Been Created" });
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: `${name} Category is already exists` }] });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }

  //For GET Categories 
  async categories(req, res) {
    const page = req.params.page; //params.page means page which in our categories URL "/categories/:page"
    const perPage = 3; //-->3 records added in per page, we added in pagination
    const skiprecord = (page - 1) * perPage; //Means only 3 records added in perpage so remaining records moving on next page

    try {
      //countDocuments() count all Categories in db
      const count = await CategoryModel.find({}).countDocuments();
      //skip() means kuch record skip kra ga
      //limit() means kitnay record fetch krwanay hai perPage pr
      //sort({updatedAt: -1}) -1 means sort in decending order means jo category last mai add hogi wo top pr show hogi 
      //updatedAt is given in time date in Mongodb when we created category
      const response = await CategoryModel.find({}).skip(skiprecord).limit(perPage).sort({ updatedAt: -1 });
      // console.log(response);
      return res.status(200).json({ categories: response, perPage, count });
    } catch (error) {
      console.log(error.message);
    }
  }

  //For Fetch Category name in input box
  async fetchCategory(req, res) {
    const { id } = req.params; //params is used for URL to get pagenumber,id etc
    try {
      const response = await CategoryModel.findOne({ _id: id });
      // console.log('Controller Response: ',response);
      return res.status(200).json({ categories: response });
    } catch (error) {
      console.log(error.message);
    }
  }

  //For Update Category
  async updateCategory(req, res) {
    const { id } = req.params;
    const { name } = req.body; //name we get from categoryServices.js in UpdataCategory function
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const nameExist = await CategoryModel.findOne({ name });
      if (!nameExist) {
        const response = await CategoryModel.updateOne({ _id: id }, { $set: { name } });
        return res.status(201).json({ msg: "Category Has Been Updated" });
      }
      else {
        return res
          .status(400)
          .json({ errors: [{ msg: `${name} Category is already exists` }] });
      }
    }
    else {
      return res.status(400).json({ errors: errors.array() });
    }

  }

  //For Delete Category
  async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      await CategoryModel.deleteOne({ _id: id });
      return res.status(201).json({ msg: "Category Has Been Deleted" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Server internal error");
    }
  }

  //For All Categories
  async allCategories(req, res) {
    try {
      const categories = await CategoryModel.find({});
      return res.status(200).json({ categories });
    } catch (error) {
      return res.status(500).json("Server internal error");
    }
  }

  async randomCategories(req, res) {
    try {
      const categories = await CategoryModel.aggregate([  //Aggregate is used to get random data from mongodb
        { $sample: { size: 5 } } //This code is to get 5 categories
      ])
      // console.log(categories)
      return res.status(200).json({ categories });
    } catch (error) {
      return res.status(500).json("Server internal error");
    }
  }


}

module.exports = new Category(); //In class export we use new keyword also
