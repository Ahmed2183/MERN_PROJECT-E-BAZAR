const express = require('express');
const env = require("./config/envConfig")
const cors = require("cors");
const connect = require("./config/db")
const UserRoute = require("./routes/UserRoute")
const CategoryRoute = require("./routes/CategoryRoute")
const ProductRoute = require("./routes/ProductRoute")
const PaymentRoute = require("./routes/PaymentRoute")
const OrderRoute = require("./routes/OrderRoute")
const app = express();

// console.log(env);

//database connection
connect();

//Middlewares 

app.use(cors());

/* This Code app.post("/webhook",... taken from shakilkhan github 
 Remove /api from shakilkhan github code bcz me don't use /api me only use /webhook*/
/* Use this code before app.use(express.json()); middleware otherwise error and dont use router.post otherwise code not working use app.post */
app.post(
    "/webhook",
    express.json({
      verify: (req, res, buf) => {
        req.rawBody = buf.toString();
      },
    })
  );

//Add middleware to access data in express
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({msg: "Welcome to E-Bazaar"});
});

//Middlewares,Call our All Routes APIS 
app.use(UserRoute); 

app.use(CategoryRoute);

app.use(ProductRoute);

app.use(PaymentRoute);

app.use(OrderRoute); 

const port = env.PORT || 5000;  //PORT is from envConfig.js


app.listen(port, () => {
    console.log(`Server is running at port number: ${port}`)
}) 
 