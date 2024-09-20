const express = require("express");
const mongoose = require("mongoose");
const routerinv = require("./Routes/inventoryRouter"); //Inventory Manager
const router = require("./Routes/artWorkRoutes"); //Artwork-manager
const inquiryrouter = require("./Routes/inquiryRoutes"); //Inquiry-manager
const ticketrouter = require("./Routes/ticketRoutes"); //Ticket-manager

const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());

//Inventory Manager
app.use("/inventory", routerinv);//Mayomi

//Artwork-manager
app.use("/artWorks", router);

//Inquiry-manager
app.use(express.json());
app.use("/inquiry", inquiryrouter); //inquiry is using the local host 5000/inquiry

//Ticket-manager
app.use(express.json());
app.use("/visitors", ticketrouter); //ticket is using the local host 5000/ticket



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
