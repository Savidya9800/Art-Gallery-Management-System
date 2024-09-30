const express = require("express");
const mongoose = require("mongoose");
<<<<<<< HEAD
const path = require("path");
const multer = require("multer");

const router = require("./Routes/artWorkRoutes");
const routerinv = require("./Routes/inventoryRouter");

=======
const routerinv = require("./Routes/inventoryRouter"); //Inventory Manager
const router = require("./Routes/artWorkRoutes"); //Artwork-manager
const inquiryrouter = require("./Routes/inquiryRoutes"); //Inquiry-manager
>>>>>>> c8bd906e6040495364200c0c9beee050ec5e549a

const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());
<<<<<<< HEAD
app.use("/artWorks", router);
app.use("/inventory", routerinv); //Mayomi
=======

//Inventory Manager
app.use("/inventory", routerinv);//Mayomi
>>>>>>> c8bd906e6040495364200c0c9beee050ec5e549a

//Artwork-manager
app.use("/artWorks", router);

//Inquiry-manager
app.use(express.json());
app.use("/inquiry", inquiryrouter); //inquiry is using the local host 5000/inquiry

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
