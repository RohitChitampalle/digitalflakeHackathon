const express = require("express")
const cors = require('cors');
// const dotenv = require('dotenv')
require('dotenv').config()
const port = 8000;

//db connection 

// dotenv.config();
const connection = require("./models/model");

//routes
const UserRouter = require("./routes/userBased")
const statusRouter = require("./routes/statusRoutes")
const roleRouter=require("./routes/roleBased")

const app = express()

//Middleware - Plugin
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json()); 


//Routes
app.use("/api/user/", UserRouter)
app.use("/api/", statusRouter)
app.use('/api/role/', roleRouter)


app.listen(port, () => {
    console.log(`server is running on ${port}`)
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connection created with Mysql successfully");
    });
})