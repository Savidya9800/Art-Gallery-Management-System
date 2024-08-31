const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/artWorkRoutes"); //Artwork-manager
const inquiryrouter = require("./Routes/inquiryRoutes"); //Inquiry-manager

const app = express();
<<<<<<< Updated upstream
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());

//Artwork-manager
app.use("/artWorks", router);
=======
const cors = require('cors');


//Middleware
app.use(express.json());
app.use("/artWorks", router );
app.use(cors());
>>>>>>> Stashed changes

//Inquiry-manager
app.use(express.json());
app.use(cors());
app.use("/inquiry", inquiryrouter); //inquiry is using the local host 5000/inquiry
app.use(cors());

//DB Connection
//DB pw-: ohYTKpIAkkGLhNTd
mongoose
  .connect(
    "mongodb+srv://admin:ohYTKpIAkkGLhNTd@cluster0.omv4o.mongodb.net/ArtGallery_DB"
  )
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
