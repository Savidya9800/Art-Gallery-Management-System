const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/artWorkRoutes");

const app = express();

//Middleware
app.use(express.json());
app.use("/artWorks", router );

//DB Connection
//DB pw-: ohYTKpIAkkGLhNTd
mongoose.connect("mongodb+srv://admin:ohYTKpIAkkGLhNTd@cluster0.omv4o.mongodb.net/")
.then(() => console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5000);
})
.catch(err => console.log(err));