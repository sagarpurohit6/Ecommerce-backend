const stripe = require("stripe")("sk_test_51KyJkiGnGTD5L49fG2dnLX0JqoagIfuHrdgD7Xwlt7j9BR8pB6kTqvVW2eQIBp9eqKjQAE5GnDiokrwDNDrJp7c600GFtBUTkK");
const uuid = require("uuid/v4");
exports.makepayment = function(req, res)  {
  const { products, token } = req.body;
  console.log("PRODUCTS", products);

  let amount = 0;
  products.map(p => {
    amount = amount + p.price;
  });
  const idempotencyKey = uuid();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id
    })
    .then(customer => {
      stripe.paymentIntents
        .create(
          {
            amount: amount * 100,
            currency: "GBP",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the product`,
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip
              }
            }
          },
          {
            idempotencyKey
          }
        )
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
    })
    .catch(console.log("FAILED"));
};