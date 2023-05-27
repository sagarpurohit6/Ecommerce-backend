const express = require("express");
 const router = express.Router();

 const {isUserSignedIn,isUserAuthenticated,isUserAdmin} = require("../controllers/auth");

const  {grabUserById,addOrderInPurchaseListArray} = require("../controllers/user");
const {updateStock} = require("../controllers/product");
const{grabCartOrderById,createCartOrder,getAllOrdersList,getUserOrderStatus,updateUserOrderStatus}= require("../controllers/order");

//parameter extrector route
router.param("userId", grabUserById);
router.param("grabCartOrderById",grabCartOrderById)

//orignal route for create order
router.post("order/create/:userId",isUserSignedIn,isUserAuthenticated,addOrderInPurchaseListArray,updateStock,createCartOrder)

//read only routes
router.get(
    "/order/all/:userId",
    isUserSignedIn,isUserAuthenticated,isUserAdmin,
    getAllOrdersList
  );


  //updating status and reading status
  router.get(
    "/order/status/:userId",
    isUserSignedIn,isUserAuthenticated,isUserAdmin,
    getUserOrderStatus
  );
  router.put(
    "/order/:orderId/status/:userId",
    isUserSignedIn,isUserAuthenticated,isUserAdmin,
    updateUserOrderStatus
  );
module.exports = router