const jwt = require("jsonwebtoken"); //For Token
const {JWT_SECRET} = require("../config/envConfig");

//route only acces when user already login not access 
// without login that why we protect createcategory route, Agr user
// acces bi kr leta ha createcategory route tu bina token ka wo
// Category add nhi krskta similar to Protected Route Frontend

class Authorization { //class name

//In this inside function we access token using header, We get token through client
    authorized(req,res,next) {  // authorized function name

   //Get Bearer token from categoryServices.js
   const headertoken = req.headers.authorization; //authorization is name from categoryServices.js in Bearer token line
   if(headertoken)
   {
    //    console.log(headertoken);
    //split means divide Bearer and token ,[1] means index one pr token hai usko access kro ,[0] pr Beaer ha
     const token = headertoken.split('Bearer ')[1];  
    //   console.log(token);
    const verifytoken = jwt.verify(token,JWT_SECRET);
    if(verifytoken)
    {
        next();  //next means next code run krna ha continue krn ha
    }
    else
    {
        return res.status(401).json({ errors: [{ msg: 'Please Add Valid Token' }] });
    }
   }
   else
   {
    return res.status(401).json({ errors: [{ msg: 'Please Add a Token' }] });
   }

    }
}

module.exports = new Authorization();