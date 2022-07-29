const mongoose = require("mongoose"); //For connect with mongo
const env = require("./envConfig")

//mongoose used asyn with await, connect is our name of arrow function
module.exports = connect =  () => {
  try {
     mongoose.connect(
      env.URL, //-->Access URL that is .env
      { useNewUrlParser: true, useUnifiedTopology: true }, //-->Both use is for handle errors
      () => {
        console.log("Database Connected Successfully");
      }
    );
  } catch (error) {
    console.log(error);
  }
};

