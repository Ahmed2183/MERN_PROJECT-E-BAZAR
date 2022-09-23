//formidable: For frontend Product data
const formidable = require('formidable'); //Copy from formidable documentation
const { v4: uuidv4 } = require('uuid');
//fs and path both are node builtin modules used to acess and change path
const fs = require("fs");
const path = require("path");
const ProductModel = require("../models/Product");
const { validationResult } = require("express-validator");
const e = require('express');


class Product {

    //For Add Product Data
    async Create(req, res) {
        const form = formidable({ multiples: true }); //-->Copy from formidable documentation,For multiple images
        form.parse(req, async (err, fields, files) => { //fields for data and files for images get from CreateProduct.js
            if (!err) {
                // console.log("Fields: ",fields);
                // console.log("Files: ",files);
                const parseData = JSON.parse(fields.Data); //Data is key of fields when console fields its see in output
                // console.log(parseData); 
                // console.log(fields.Sizes);
                const errors = [];
                if (parseData.title.trim().length === 0) //trim removing space
                {
                    errors.push({ msg: 'Title is Required' })
                }
                if (parseInt(parseData.price) < 1) //parseInt convert string into number
                {
                    errors.push({ msg: 'Price should be above $1' })
                }
                if (parseData.price.length === 0) //trim removing space
                {
                    errors.push({ msg: 'Price is Required' })
                }
                if (Number(parseData.discount) < 0) //parseInt convert string into number
                {
                    errors.push({ msg: 'Discount should not be negative' })
                }
                if (parseData.discount.length === 0) //trim removing space
                {
                    errors.push({ msg: 'Discount is Required' })
                }
                if (parseInt(parseData.stock) < 20) //parseInt convert string into number
                {
                    errors.push({ msg: 'Stock should be above 20' })
                }
                if (parseData.stock.length === 0) //trim removing space
                {
                    errors.push({ msg: 'Stock is Required' })
                }
                if (parseData.category.trim().length === 0) //trim removing space
                {
                    errors.push({ msg: 'Category is Required' })
                }
                if (parseData.description.trim().length === 0) //trim removing space
                {
                    errors.push({ msg: 'Description is Required' })
                }
                // console.log('errors',errors)
                if (errors.length === 0) {
                    //  console.log("Files: ",files);
                    if (!files['Image1'])  //Image1, Image2, Image3 names is from CreateProduct.js
                    {
                        errors.push({ msg: 'Image1 is Required' })
                    }
                    if (!files['Image2']) {
                        errors.push({ msg: 'Image2 is Required' })
                    }
                    if (!files['Image3']) {
                        errors.push({ msg: 'Image3 is Required' })
                    }
                    if (errors.length === 0) {
                        const images = [];
                        //For image extension validation code
                        for (let i = 0; i < Object.keys(files).length; i++) //Object.keys is javascript built-in used to check object keys
                        {
                            const mimeType = files[`Image${i + 1}`].mimetype;
                            //  console.log(mimeType); //In mimetype we have image/extension
                            const extension = mimeType.split('/')[1].toLowerCase();
                            //  console.log(extension); //In extension we have image extension
                            if (extension === 'jpeg' || extension === 'jpg' || extension === 'png') {
                                // console.log("Fine Image")
                                //uuid for unique image name
                                const imageName = uuidv4() + `.${extension}`;
                                //Store images in client>public>images folder
                                const __dirname = path.resolve();
                                // console.log(__dirname);
                                const newPath = __dirname + `/../client/public/images/${imageName}`;
                                images[`Image${i + 1}`] = imageName;
                                // console.log(newPath);
                                fs.copyFile(files[`Image${i + 1}`].filepath, newPath,
                                    (err) => {
                                        if (err) {
                                            console.log(err)
                                            // console.log("Image Uploaded");
                                        }
                                    })
                            }
                            else {
                                const error = {};
                                error[`msg`] = `Image${i + 1} has invalid ${extension} type`;
                                errors.push(error);
                            }
                        }
                        if (errors.length === 0) {
                            // console.log('All Images: ',images);
                            try { //Save Data in MongoDB
                                const response = await ProductModel.create({
                                    title: parseData.title,
                                    price: parseInt(parseData.price),
                                    discount: parseInt(parseData.discount),
                                    stock: parseInt(parseData.stock),
                                    category: parseData.category,
                                    colors: parseData.colors,
                                    sizes: JSON.parse(fields.Sizes), //small name of sizes is from ProductModel and capital name of Sizes is from CreateProduct.js
                                    image1: images[`Image1`],
                                    image2: images[`Image2`],
                                    image3: images[`Image3`],
                                    description: parseData.description
                                })
                                return res.status(201).json({ msg: 'Product Has Been Created', response });
                            }
                            catch (error) {
                                console.log(error);
                                return res.status(500).json(error);
                            }
                        }
                        else {
                            return res.status(400).json({ errors }); //Show output in inspect console
                        }
                    }
                    else {
                        return res.status(400).json({ errors }); //Show output in inspect console
                    }
                }
                else {
                    return res.status(400).json({ errors }); //Show output in inspect console
                }
            }
        })
    }

    //For Get All Products
    async Get(req, res) {
        const page = req.params.page;
        const perPage = 5;
        const skiprecord = (page - 1) * perPage;
        try {
            const count = await ProductModel.find({}).countDocuments();
            const response = await ProductModel.find({}).skip(skiprecord).limit(perPage).sort({ updatedAt: -1 });
            // console.log(response);
            return res.status(200).json({ products: response, perPage, count });
        } catch (error) {
            console.log(error.message);
        }
    }


    //For Get Single Poduct
    async getProduct(req, res) {
        const { id } = req.params;
        try {
            // -image means we dont want to update images
            const product = await ProductModel.findOne({ _id: id });
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ error: error.message })
            console.log(error.message);
        }
    }

    //For Update Product
    async updateProduct(req, res) {

        const errors = validationResult(req);
        // console.log(req.body); 
        if (errors.isEmpty()) {
            try {
                const { _id, title, price, discount, stock, category, colors, sizes, description } = req.body;
                const response = await ProductModel.updateOne({ _id }, {
                    $set: {
                        title, price, discount, stock, category,
                        colors, sizes, description
                    }
                });
                return res.status(201).json({ msg: 'Product Has Been Updated', response });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ errors: error });
            }
        }
        else {
            return res.status(400).json({ errors: errors.array() });
        }
    }

    //For Delete Product
    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const product = await ProductModel.findOne({ _id: id });
            //For Delete images
            [1, 2, 3].forEach((number) => { // [1,2,3] means three times loop chlay ga
                let key = `image${number}`;
                //    console.log(key);
                let image = product[key];
                let __dirname = path.resolve();
                let imagePath = __dirname + `/../client/public/images/${image}`;
                fs.unlink(imagePath, (err) => {  //unlink is used delete images from folder
                    if (err) {
                        throw new Error(err);
                    }
                })
            });
            //For Delete Product
            await ProductModel.findByIdAndDelete(id);
            return res.status(200).json({ msg: 'Product Has Been Deleted Successfully' });
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

module.exports = new Product;