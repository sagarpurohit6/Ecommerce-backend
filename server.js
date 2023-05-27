const mongoose = require("mongoose")
require('dotenv').config()
const express = require("express")
const app = express();

//using middleware from doc of  bodyparser,cookieparser,cors
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


//app routes
//importing routes of authentication
const authenticationRoute = require("./routes/auth");

//user route
const userRoute = require("./routes/user")

//category route
const categoryRoute = require("./routes/category")

//prodcut routw
const prodcutRoute = require("./routes/product")
//payment route
const brainTreePayment = require("./routes/brainTreePayment")

//payment route two
const stripeRoutes = require("./routes/stripePayment");


//order route
const orderRoute = require("./routes/order")




mongoose.connect(process.env.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).then(()=>{
    console.log("YOUR DB IS CONNECTED")
})

//app.use from offical doc of all three bodyparser, cors, cookieparser
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


// all the routes 
//here addding api between conection of all routes from other files 
//app.use() to enable file to use from other folder
app.use("/api", authenticationRoute)
app.use("/api", userRoute)
app.use("/api", categoryRoute)
app.use("/api", prodcutRoute)
app.use("/api", orderRoute)
app.use("/api", brainTreePayment)
app.use("/api", stripeRoutes);



//port 
const port =process.env.port

//starting the server

app.listen( port ,()=>{

    console.log(`server is running on ${port}`)
})