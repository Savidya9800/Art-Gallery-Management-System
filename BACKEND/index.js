const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/artWorkRoutes");
const inquiryrouter = require("./Routes/inquiryRoutes");

const app = express();

//Middleware
app.use(express.json());
app.use("/artWorks", router );

//Inquiry-manager
app.use(express.json());
app.use("/inquiry", inquiryrouter); //inquiry is using the local host 5000/inquiry




//DB Connection
//DB pw-: ohYTKpIAkkGLhNTd
mongoose.connect("mongodb+srv://admin:ohYTKpIAkkGLhNTd@cluster0.omv4o.mongodb.net/ArtGallery_DB")
.then(() => console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5000);
})
.catch(err => console.log(err));