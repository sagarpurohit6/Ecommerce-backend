const express = require("express");
const { check } = require('express-validator');
const router =express.Router(); 

//to impoert particular model  {} from controller
const { signout,signup,signin,isUserSignedIn} = require("../controllers/auth");


//signup route
//post method 
router.post("/signup",[
    check("name").notEmpty().withMessage('name is Requiered'),
    check("email").isEmail().withMessage("email is required"),
    check("password").isLength({min:6}).withMessage("password must be at least 6 chars long")
    ],signup)



// signin route
    router.post("/signin",[
        check("password").isLength({min:1}).withMessage("password is required"),
        check("email").isEmail().withMessage("email is required")],signin)



//creating signout route
//get method
router.get ("/signout",signout)

router.get("/test",isUserSignedIn,function(req,res){
    return res.send("user is authenticated")

})

//expoting file so it can be used in other file 
module.exports = router;