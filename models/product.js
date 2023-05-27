const mongoose = require("mongoose")

const {ObjectId} = mongoose.Schema


const prodcutSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        maxlength: 40,
        required:true
},
      description:{
          type:String,
          trim:true,
          maxlength:3000
      },
      price:{
          type:Number,
          trim:true,
          required:true
      },
      photo:{
          type:Buffer,
          contentType:String

      },
      category:{
          type:ObjectId,
          ref: "Category",
          required:true

          

      },
      stock:{
          type:Number,
          


      },
      sold:{
          type:Number,
          default:0

      },
      size:{
          type:String,
          trim:true,
          maxlength:10
      }
},{timestamps:true})

module.exports = mongoose.model("Prodcut",prodcutSchema)

