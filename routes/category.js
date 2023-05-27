const express = require("express")
const router = express.Router();

//require controllers for this route
const {grabCategoryById,
    grabCategory,
    grabAllCategory,
    createCategoryForAdmin,
    updateProdcutCategory,
    removeProdcutCategory} = require("../controllers/category")

const {isUserSignedIn,isUserAuthenticated,isUserAdmin} = require("../controllers/auth");

const  {grabUserById} = require("../controllers/user");


//usig parameter extrector
router.param("UserById",grabUserById);
router.param("categoryId",grabCategoryById);

//all category routes

//post routes to create categorie
router.post(
    "/category/create/:UserById",isUserSignedIn,
isUserAdmin,createCategoryForAdmin)

//get routes for read
router.get("/category/:categoryId",grabCategory)
router.get("/catogaries",grabAllCategory)

//put routes for update

router.put("/category/update/:categoryId/:UserById",isUserSignedIn,isUserAuthenticated,
isUserAdmin,updateProdcutCategory)



//delete routes for delete

router.delete("/category/delete/:categoryId/:UserById",isUserSignedIn,isUserAuthenticated,
isUserAdmin,removeProdcutCategory)






module.exports = router;