const express = require("express");
  const { isUserSignedIn, isUserAuthenticated, isUserAdmin } = require("../controllers/auth");
const { grabUserById, grabUser, updateUserProfile,userCartlist } = require("../controllers/user");
const router = express.Router();




router.param("UserById",grabUserById);

router.get("/user/:UserById",isUserSignedIn,isUserAuthenticated,grabUser);


// router.get("/allusers",grabAllUser)

//user profile update route
router.put("/userupdate/:UserById",isUserSignedIn,isUserAuthenticated,updateUserProfile);
router.put("/user/orders/:UserById",isUserSignedIn,isUserAuthenticated,userCartlist);


module.exports = router;