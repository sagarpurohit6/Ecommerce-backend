const express = require("express");
const router = express.Router();

const {isUserSignedIn,isUserAuthenticated} = require("../controllers/auth");



const { makepayment } = require("../controllers/stripepayment");

router.post("/stripepayment", makepayment);

module.exports = router;