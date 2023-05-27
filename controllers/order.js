const CartPageOrder = require("../models/order");
const AddedProdcutInCart = require("../models/order")

exports.grabCartOrderById = function(req,res,next,id){
    CartPageOrder.findById(id).populate("products.product", "name price").exec(function(error,cartorder){
        if(error || !cartorder){
            res.status(400).json({
                error:"orde not found in database"
            })
        }
        req.cartorder= cartorder;
        next()
    })
}


exports.createCartOrder = function(req,res){
    req.body.cartorder.user = req.profile;
    const cartorder= new CartPageOrder(req.body.cartorder)
    cartorder.save(function(error,order){
        if(error || !order){
            res.status(400).json({
                error:"failed to procced and save your order in Database"
            })
            res.json(order)
        }

    })
}



exports.getAllOrdersList = function(req, res){ Order.find().populate("user", "_id name").exec(function(err, order) {
        if (err) {
          return res.status(400).json({
            error: "No orders found in DB"
          });
        }
        res.json(order);
      });
  };


  exports.getUserOrderStatus = function(req,res) {res.json(Order.schema.path("status").enumValues);};
  
  exports.updateUserOrderStatus= function(req,res){ Order.update({ _id: req.body.orderId },
      { $set: { status: req.body.status } },
      function(err, order){if (err) 
        {
          return res.status(400).json({
            error: "Cannot update order status"
          });
        }
        res.json(order);
      }
    );
  };