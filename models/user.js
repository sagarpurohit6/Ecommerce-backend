
const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");


//creating schema based on mongoose doc
const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
        maxlength:35,
        trim:true
    },

    lastname  :{
        type:String,
        maxlength:30,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },

    encry_password:{
        type:String,
        required:true
    },
    salt:String,
    userinfo:{
        type:String,
        trim:true
    },
    role:{
        type:Number,
        default:0
    },

    purchases:{
        type:Array,
        default:[]
    }



},

{ timestamps: true })




//using virtuals from mongoose doc
userSchema
.virtual("password")
.set(function(password){
    this._password =password
    this.salt = uuidv1();
    this.encry_password = this.protectingPassword(password)

})
.get(function(){
    return this._password;

})
  

//using methods from mongoose doc

userSchema.methods = {
      authentication: function(comparingPassword) 
      {
         return this.protectingPassword(comparingPassword) === this.encry_password;
     }, 
     protectingPassword:function(passingPlanPassword) 
     {
            if (!passingPlanPassword) 
            return "";
            try {
              return crypto.createHmac("sha256", this.salt).update(passingPlanPassword)
                .digest("hex");
            } 
            catch (err)
             {
              return "";
            }
          }
        };

module.exports = mongoose.model("User",userSchema)