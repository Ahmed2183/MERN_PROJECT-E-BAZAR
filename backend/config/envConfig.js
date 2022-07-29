require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,  //env.PORT =  PORT is from env
    URL: process.env.URL,  //For Database connection
    JWT_SECRET: process.env.SECRET  //For token
}