const express = require('express');
const HomeProduct = require('../controllers/HomeProductController');
const router = express.Router();
const Product = require("../controllers/ProductController");
const Authorization = require("../services/Authorization");
const { productvalidation } = require("../validations/ProductValidation")

//For Add Product Data
router.post('/createproduct', [Authorization.authorized], Product.Create);

//For Get All Products
router.get("/products/:page", Authorization.authorized, Product.Get);

//For Get Single Product
router.get("/product/:id", Product.getProduct);

//For Update Product
router.put("/updateproduct", [productvalidation, Authorization.authorized], Product.updateProduct);

//For Delete Product
router.delete("/delete/:id", Authorization.authorized, Product.deleteProduct);

//For Category Products
router.get("/categoryproducts/:name/:page?", HomeProduct.categoryProducts);  // ? means page is optional

//For Search Products
router.get("/searchproducts/:keyword/:page?", HomeProduct.categoryProducts); 

module.exports = router;