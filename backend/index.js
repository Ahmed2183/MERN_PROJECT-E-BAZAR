const express = require('express');
const env = require("./config/envConfig")
const cors = require("cors");
const connect = require("./config/db")
const UserRoute = require("./routes/UserRoute")
const CategoryRoute = require("./routes/CategoryRoute")
const ProductRoute = require("./routes/ProductRoute")
const app = express();

// console.log(env);

//database connection
connect();

//Middlewares 

app.use(cors());

//Add middleware to access data in express
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({msg: "Welcome to E-Bazaar"});
});

//Middlewares,Call our All Routes APIS
app.use(UserRoute); 

app.use(CategoryRoute);

app.use(ProductRoute);

const port = env.PORT || 5000;  //PORT is from envConfig.js


app.listen(port, () => {
    console.log(`Server is running at port number: ${port}`)
})
