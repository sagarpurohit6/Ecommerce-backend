const User = require("../models/user")
const Cartpage  = require("../models/order")


exports.grabUserById= function(req,res,next,id){
    User.findById(id).exec(function(err,user){
        if(err){
            return res.status(400).json({error:"something went wrong"})
        }
        if(!user){
            return res.status(400).json({eroor:"No user found in Database"})
        }
        req.profile = user;
        next();
})

}



exports.grabUser = function(req, res){
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
     req.profile.updatedAt = undefined;
    return res.json(req.profile);
  };



exports.updateUserProfile=function(req, res) {
    User.findByIdAndUpdate( { _id: req.profile._id },
      { $set: req.body },//$set to in which part to update here we are passying whole user profile
      { new: true, useFindAndModify: false },
      (error, user) => {if (error) {
          return res.status(400).json({error: "unable to update user profile" });
        }
        user.createdAt = undefined;
        user.updatedAt = undefined;
        user.salt = undefined;
        user.encry_password = undefined;
        res.json(user);
      }
    );
  };

//using populate from mongoose to connect other schema from others model
  exports.userCartlist= function(req,res){ 
    Cartpage.find({user: req.profile._id}).populate("User", "_id name ")
    .exec(function(error,orders){
      if(error){
        return res.status(400).json({error:"unable to find any order"})
      }
      return res.json(orders)

    })

  }

  //pusing user purchase list

  exports.addOrderInPurchaseListArray = function(req,res,next){
    let userPurchases = []
    req.body.order.prodcuts.array.forEach(purchasedProdcut => {
      userPurchases.push({
        _id: purchasedProdcut._id,
        name: purchasedProdcut.name,
        description: purchasedProdcut.description,
        category: purchasedProdcut.category,
        quantity: purchasedProdcut.quantity,
        amount: req.body.order.amount,
        transaction_id: req.body.order.transaction_id 
      })
      
    });


    User.findOneAndUpdate(
      {
        _id: req.profile._id

    },
    {
      $push:{userPurchases: purchases}
    },
    {
      new: true
    },
    function(error,userPurchase){
      if(error){
        return res.status(400).json({
          error:"purchase list is unable to save in db"
        })
      }
      next();
    }
    
    
    )

  
  }

  




