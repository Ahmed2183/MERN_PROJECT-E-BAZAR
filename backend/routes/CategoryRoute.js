const express = require('express');
const router = express.Router();
const { categoryvalidation } = require("../validations/CategoryValidation")
const Category = require("../controllers/CategoryController"); //import class with square brackects {}
const Authorization = require("../services/Authorization");

//Create Category API:POST
//Create is class function in CategoryController.js, authorized is class function Authorization.js
//If we have multiple middlewares then we use in array brackects []
router.post("/createcategory", [categoryvalidation, Authorization.authorized], Category.Create);

//Categories API: GET , Make Protected Route , /:page means use page number, //For Pagination
router.get("/categories/:page", Authorization.authorized, Category.categories);
//For fetch category using id
router.get("/fetchcategory/:id", Authorization.authorized, Category.fetchCategory);
//For Update Category
router.put("/updatecategory/:id", [categoryvalidation, Authorization.authorized], Category.updateCategory);
//For Delete Category
router.delete("/deletecategory/:id", Authorization.authorized, Category.deleteCategory);
//For All Categories
router.get("/allcategories", Category.allCategories);
//For Fetch Random Categories
router.get("/randomcategories", Category.randomCategories);

module.exports = router;

