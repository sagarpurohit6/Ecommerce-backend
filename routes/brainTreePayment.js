const express = require("express");
const router = express.Router();

const {isUserSignedIn,isUserAuthenticated} = require("../controllers/auth");
const  {grabUserById} = require("../controllers/user");
const { getTokenFromUser, processPaymentOfUser } = require("../controllers/brainTreePayment");


router.param("grabUserById",grabUserById);

router.get("/payment/gettoken/:grabUserById", isUserSignedIn,isUserAuthenticated,getTokenFromUser);

router.post(
  "/payment/braintree/:grabUserById",
  isUserSignedIn,isUserAuthenticated,
  processPaymentOfUser
);

module.exports = router;