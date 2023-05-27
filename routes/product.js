const express = require("express");
const router = express.Router();

const {grabProductById, createProduct, grabProduct,photo,deleteProduct,updateProduct,getAllProducts,getAllUniqueCategories} = require("../controllers/product");


const {isUserSignedIn,isUserAuthenticated,isUserAdmin} = require("../controllers/auth");

const  {grabUserById} = require("../controllers/user");
//all of params
router.param("userId", grabUserById);
router.param("grabProductId",  grabProductById)

//all of actual routes
//create route
router.post(
  "/product/create/:userId",
  isUserSignedIn,
  isUserAuthenticated,
  isUserAdmin,
  createProduct
);

//read routes for admin
router.get("/product/:grabProductId",grabProduct)
router.get("/product/photo/:grabProductId", photo);

//deleting prodcut
router.delete("/product/:grabProductId/:userId",isUserSignedIn,isUserAuthenticated,
isUserAdmin,deleteProduct )

//updating prodcut
router.put("/product/:grabProductId/:userId",isUserSignedIn,isUserAuthenticated,
isUserAdmin,updateProduct )


router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategories);
module.exports = router;

// // read routes
// router.get("/product/:productId", getProduct);
// router.get("/product/photo/:productId", photo);

// //delete route
// router.delete(
//   "/product/:productId/:userId",
//   isSignedIn,
//   isAuthenticated,
//   isAdmin,
//   deleteProduct
// );

// //update route
// router.put(
//   "/product/:productId/:userId",
//   isSignedIn,
//   isAuthenticated,
//   isAdmin,
//   updateProduct
// );

// //listing route
// router.get("/products", getAllProducts);

// router.get("/products/categories", getAllUniqueCategories);



























// const express = require("express")
// const router = express.Router();

// //importing controllers 


// const{grabProdcutById,createProdcut}= require("../controllers/prodcut");
// const{isUserSignedIn,isUserAuthenticated,isUserAdmin}= require("../controllers/auth")
// const{grabUserById}= require("../controllers/user")


// //parameter extrector 

// router.param("UserById",grabUserById)
// router.param("grabProdcutById",grabProdcutById)

// //orginal routes from prodcut

// router.post("/prodcut/create/:UserById",isUserSignedIn,isUserAuthenticated,
// isUserAdmin,createProdcut)
// module.exports = router 



