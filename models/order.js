const mongoose = require("mongoose");
const{ ObjectId} = mongoose.Schema


const addedProdcutInCartSchema = new mongoose.Schema({
    prodcuts:{
        type:ObjectId,
        ref:"Prodcut"
    },
    name:{
        type:String,
        trim:true
    },
    count:{
        type:Number
    },
    price:{
        type:Number
    }
})

// cart page schema when user add prodcut in cart 

const cartPageSchema = new mongoose.Schema({
       
    prodcut:[addedProdcutInCartSchema],//total added prodcut in cart 
    amout: {
        type: Number
    },
    address:{
        type:String
    },
    status: {
        type: String,
        default: "Recieved",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
      },
    updated:Date,
    transaction_id: {},
    user:{// which user added prodcut in cart
        type:ObjectId,
        ref:"User"
    }



}, {
    timestamps:true,
});




module.exports = mongoose.model("Cartpage",cartPageSchema);
module.exports = mongoose.model("AddedProdcutInCart", addedProdcutInCartSchema);