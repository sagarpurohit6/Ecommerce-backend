//importing user schema model from models
const User = require("../models/user");
const {  validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require("express-jwt");



//controller of auth
//user sign up controller
exports.signup = function(req,res){

    //error msg for validation
const error = validationResult(req)
if (!error.isEmpty()) {
    return res.status(422).json({ errors: error.array()[0].msg,});
  }
    //using body parser
  //   console.log("req body", req.body);
  //  res.json({
  //     meseege: "you are signup on the system"
  //  })
  const user = new User(req.body)
  //using mongodb .save method to save user in db
  user.save(function(err,user){
      if (err){ return res.status(400).json({ err: "unable to save user in db"})
      }
      res.json({name: user.name,lastname:user.lastname, email:user.email, id:user._id})

  })
}

//
//user signin  controller
exports.signin = (req,res)=>{

    //destrcutring data from body to get only required value
const {email,password} = req.body
const errors = validationResult(req)
    
if (!errors.isEmpty()) {
    return res.status(422).json({ 
        errors: errors.array()[0].msg,
     });
  }

//using mongoose find one method to acces particula one data fiel
  User.findOne({email} , function(err,user){
      if(err ){return res.status(400).json({
              error: "please enter correct details"})
      }
      if(!user){
          return res.status(400).json({
            error: "This email is not registerd with us."}) }
     
      //using authentication from user model comparing password
      if(!user.authentication(password)){
          return res.status(401).json({
              error:"This email and password does not match"
          })

      }

      //crating token as per jwt doc
      const token = jwt.sign({_id: user._id}, process.env.secret )

        //puting token into cookie
         res.cookie("token",token,{expire: new Date() +9999});

        //sending info to frontend

        const{_id,name,email,role} = user
        return res.json({token,user:{_id,name,email,role }}) 

  });
}

//
//user signout controller

//exporting particular module directly
 exports.signout=function(req,res){ /* to clear cookie and signout*/
 res.clearCookie("token")

    //to send res in json use res.json({})
    return res.json({ meseege: "you are succesfully signedout"})
}

    //setting up valiadaition for user signIN or protected routes

    exports.isUserSignedIn = expressJwt({
        secret: process.env.secret,
        userProperty:"authentication"
    })


//

    //custom middlewares for user authentication

    exports.isUserAuthenticated = function(req,res,next){
        let authChecker = req.profile && req.authentication && req.profile._id == req.authentication._id;
        if(!authChecker){
          return res.status(403).json({
                error: "Access Denied from authentication"
            })
        }

        next()
    }

    //custom middleware for to check if user is admin or not

    exports.isUserAdmin = function(req,res,next){

        //checking with 0 because in user schema we set 0 means regular user
        // and 1 means admin
        if(req.profile.role === 0){
           return res.status(403).json({
                error:"trying to access unauthorised route, you are not a admin"
            })
        }

        next()
    }