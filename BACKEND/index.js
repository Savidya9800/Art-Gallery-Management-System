const express = require("express");
const mongoose = require("mongoose");
const routerinv = require("./Routes/inventoryRouter"); //Inventory Manager
const router = require("./Routes/artWorkRoutes"); //Artwork-manager
const inquiryrouter = require("./Routes/inquiryRoutes"); //Inquiry-manager
const transactionRoutes = require("./Routes/transactionRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");

const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());

//Inventory Manager
app.use("/inventory", routerinv); //Mayomi

//Artwork-manager
app.use("/artWorks", router);

//Inquiry-manager
app.use(express.json());
app.use("/inquiry", inquiryrouter); //inquiry is using the local host 5000/inquiry
app.use("/transactions", transactionRoutes);
app.use("/api/payments", paymentRoutes);
//DB Connection
//DB pw-: ohYTKpIAkkGLhNTd
mongoose
  .connect(
    "mongodb+srv://admin:ohYTKpIAkkGLhNTd@cluster0.omv4o.mongodb.net/ArtGallery_DB"
  )
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5001);
  })
  .catch((err) => console.log(err));
