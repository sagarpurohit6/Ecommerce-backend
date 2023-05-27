const Category = require("../models/category")

exports.grabCategoryById = (req,res,next,id)=>{
    Category.findById(id).exec(function(error,category){
        if(error || !category){
            res.status(400).json({
                error:"unable to find category in database "
            })
        }
        req.category = category;
        next()
       
    })

}

exports.createCategoryForAdmin = function(req,res){
    const category = new Category(req.body)
    category.save(function(error,savecategory){
        if(error || !savecategory){
            res.status(400).json({
                error:"unable to save or create category in database"
            })
        }
        res.json(savecategory)
    })

}

exports.grabCategory = function(req,res){
  return res.json(req.Category);


}

exports.grabAllCategory = function(req,res){
    Category.find().exec(function(error,allcatrgory){
        if (error || !allcatrgory){
            res.status(400).json({
                error:"unable to find categories"
            })
        }
        res.json(allcatrgory)

    })

}

exports.updateProdcutCategory =function(req,res){
    const category = req.category;
   category.name = req.body.name;

    category.save(function(error,updatedCategory){
        if(error || !updatedCategory){
            res.status(400).json({
                error: "unable to update category in databse"
            })
        }
        res.json(updatedCategory)
    })
}




exports.removeProdcutCategory = function(req,res){
    const category = req.category;

    category.remove(function(error,removedcat){
        if(error){
            res.status(400).json({
                error:"unable to delete category from DB"
            })

        }
        res.json({
            message:`this category deleted successfully ,${removedcat.name}`
        })
    })

}