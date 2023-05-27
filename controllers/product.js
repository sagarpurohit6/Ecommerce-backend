
const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.grabProductById= function(req, res, next, id){
  Product.findById(id)
    .populate("category")
    .exec(function(err, product){
      if (err || !product) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = function(req, res){
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //destructure the fields
    const { name, description, price,  category,stock } = fields;

    if (!name || 
      !description || 
      !price || 
      !category|| 
       !stock) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    console.log(product);

    //save to the DB
    product.save(function(err, product){
      if (err) {
        res.status(400).json({
          error: "Saving tshirt in DB failed"
        });
      }
      res.json(product);
    });
  });
};


exports.grabProduct = function(req, res){
  req.product.photo = undefined;
  return res.json(req.product);
};

//middleware to make faste competimization of photo
exports.photo = function(req, res, next){
  if (req.product.photo) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo);
  }
  next();
};

// delete controllers
exports.deleteProduct = function(req, res){
  let product = req.product;
  product.remove(function(err, deletedProduct){
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product"
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedProduct
    });
  });
};

// delete controllers
exports.updateProduct = function(req, res){
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, function(err, fields, file){
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }

    //updation code
    let product = req.product;
    product = _.extend(product, fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    // console.log(product);

    //save to the DB
    product.save(function(err, product){
      if (err) {
        res.status(400).json(
        {
          error: "Updation of product failed"
        });
      }
      res.json(product);
    });
  });
};

//product listing

exports.getAllProducts =function(req, res){
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "NO product FOUND"
        });
      }
      res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "NO category found"
      });
    }
    res.json(category);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map(prod => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } }
      }
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed"
      });
    }
    next();
  });
};




























//old code


// const Prodcut = require("../models/prodcut")

// //using formidable for storing photo
// const formidable = require("formidable");
// const _ = require("lodash")
// const fs = require("fs")

// exports.grabProdcutById = function(req,res,next,id){
//     Prodcut.findById(id).populate("category")
//     .exec(function(error,prodcut){
//         if(error || !prodcut){
//             res.status(400).json({
//                 error:"unable to find any prodcut"
//             })
//         }
//         req.prodcut = prodcut;
//         next()
//     })
// }


///old code

// function(req,res){
//     //from formidable doc
//     const form = new formidable.IncomingForm();
//     form.keepExtension = true;


//     form.parse(req, (err, fields, file) => {
//         if (err) {
          
//           return res.status(403).json({
//               error:"image have problem"
//           });
//         }
        
//         // destrcturing our schema
//         const {name,description,price, category,stock} = fields;
//         if( !name||!description||!price||!category||!stock
//         ){
//             return res.status(400).json({
//                 error:"please enter all fields"
//             })
//         }


//         const prodcut = new Prodcut(fields)


//         //hamdling file
//         if(file.photo){
//             if(file.photo.size>3000000){
//                 return res.status(400).json({
//                     error:"file size is to big"
//                 })
//             }
//             prodcut.photo.data = fs.readFileSync(file.photo.filepath)
//             prodcut.photo.contentType = file.photo.mimetype
//         }
//         prodcut.save(function(error,prodcut){
//             if(error || !prodcut){
//                 res.status(400).json({
//                     error:"unable to save prodcut in DB"
//                 })
//             }
//             res.json(prodcut)
//         })
//       });
//     }