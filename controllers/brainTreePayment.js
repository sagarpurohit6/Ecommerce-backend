
const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "hw8cfwmwtp5b789s",
  publicKey: "drk9kzxw4syk72fz",
  privateKey: "1bda93690e44b7018af4efa8020984cd"
});

exports.getTokenFromUser = function(req, res) {
  gateway.clientToken.generate({}, 
    function(err, res) {
    if (err || !res) {
      res.status(500).json(err);
    } else {
      res.send(res);
    }
  });
};

exports.processPaymentOfUser = function (req, res){ let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true
      }
    },
    function(err, result){
      if (err) {
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    }
  );
};