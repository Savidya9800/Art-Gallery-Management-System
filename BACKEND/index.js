const express = require("express");
const mongoose = require("mongoose");
const routerinv = require("./Routes/inventoryRouter"); //Inventory Manager
const router = require("./Routes/artWorkRoutes"); //Artwork-manager
const inquiryrouter = require("./Routes/inquiryRoutes"); //Inquiry-manager
//const transactionRoutes = require("./Routes/transactionRoutes");
//const paymentRoutes = require("./Routes/paymentRoutes");
const pdfSchema = require("./Models/artWorkImgModel"); //pdf
const pdfSchema2 = require("./Models/paymentReceiptModel"); //pdf
const ticketrouter = require("./Routes/ticketRoutes"); //Ticket-manager

//event
const Artistrouter = require('./Routes/EventRoutes/artistRoutes') // event 
const RequestEventrouter = require('./Routes/EventRoutes/requestEventRoutes') // event

const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());

app.use("/files", express.static("files")); //for PDF upload

//Inventory Manager
app.use("/inventory", routerinv);//Mayomi

//Artwork-manager
app.use("/artWorks", router);

//Inquiry-manager
app.use("/inquiry", inquiryrouter); //inquiry is using the local host 5000/inquiry

//Ticket-manager
app.use("/visitors", ticketrouter); //ticket is using the local host 5000/ticket

//Inventory Manager
app.use("/inventory", routerinv); //Mayomi

//Artwork-manager
app.use("/artWorks", router);

//Inquiry-manager
app.use("/inquiry", inquiryrouter); //inquiry is using the local host 5000/inquiry


//event
app.use('/artist', Artistrouter);
app.use('/requestEvent', RequestEventrouter);


//Financial Manager
//app.use("/transactions", transactionRoutes);
//app.use("/api/payments", paymentRoutes);

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

//PDF - - - - - - - -
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./file");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

//Insert Model Part
require("./Models/artWorkImgModel");
const uplode = multer({ storage: storage });

//in Artwork Image
app.post("/uploadFile", uplode.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const pdf = req.file.filename;

  try {
    await pdfSchema.create({ title: title, pdf: pdf });
    console.log("Pdf uploaded successfully");
    res.status(200).send({ status: 200, message: "Pdf uploaded successfully" });
  } catch (error) {
    console.log("Error Uploading :" + error.message);
    res.status(500).send({ status: 500, message: "Pdf not uploaded" });
  }
});

//Next video
app.get("/getFile", async (req, res) => {
  try {
    const data = await pdfSchema.find();
    res.status(200).send({ status: 200, data: data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: "Error in getting pdf" });
  }
});

//Insert Model Part in Payment Receipt
app.post("/uploadReceipt", uplode.single("file"), async (req, res) => {
  console.log(req.file);
  const pdf = req.file.filename;

  try {
    await pdfSchema2.create({ pdf: pdf });
    console.log("Payment receipt uploaded successfully");
    res
      .status(200)
      .send({ status: 200, message: "Payment receipt uploaded successfully" });
  } catch (error) {
    console.log("Error Uploading :" + error.message);
    res.status(500).send({ status: 500, message: "Pdf not uploaded" });
  }
});
