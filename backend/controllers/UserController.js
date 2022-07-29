const { validationResult } = require("express-validator");
const UserModel = require("../models/User");
const {hashedPassword,createToken,comparePassword} = require("../services/authServices");

//User Register Controller means control user register data
module.exports.register = async (req, res) => {
  //   console.log(req.body);
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name, email, password } = req.body;
    try {
      const emailExist = await UserModel.findOne({ email });
      if (!emailExist) {
        const hash = await hashedPassword(password); //For HASH Password Call authServices.js function
        const userdata = await UserModel.create({  //-->Add data to database
            name,
            email,
            password:hash,
            // admin:true  
            //true when we add admin,
            //If you want to add admin then write admin:true,
            //If you dont want to add admin then dont write admin in code remove them or comment them admin:false in database
        })
        //Dont store user secret inforamtion in token anyone decode them in below we store id,name
        const token = createToken({id:userdata._id, name: userdata.name}); //Call createToken function from authServices.js
        return res
          .status(200)
          .json({ msg: "Account Has Been Created",token });
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: `${email} is already taken`, param: 'email' }]});
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Server internal error");
    }
  } else {
    //For Errors
    return res.status(400).json({ errors: errors.array() });
  }
};



//Code For Login Controller
module.exports.login = async (req,res) => {
  const {email,password} = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty()) //For Errors
  {
     return res.status(400).json({errors: errors.array()})
  }
  try
  {
      const userdata = await UserModel.findOne({email});  //-->UserModel is our model User.js
      if(userdata)
      {
          const matched = await comparePassword(password,userdata.password); //Matched password with Hash database Password
          if(matched)
          {
               //Create token
               const token = createToken({id:userdata._id, name: userdata.name});
               if(userdata.admin) //For admin if admin then show true else false
               {
               return res.status(201).json({msg:'Login Successfully',token, admin:true});
               }
               else {
                return res.status(201).json({msg:'Login Successfully',token, admin:false});
               }
          }
          else
          {
              return res.status(400).json({errors: [{msg:"Password not Matched", param: 'password'}]})
          }
      }
      else
      {
          return res.status(400).json({ errors: [{ msg: `${email} is not found`,  param: 'email' }] });
      }
  }
  catch(error)
  {
      console.log(error.message);
      return res.status(500).json("Server internal error");
  }
};
