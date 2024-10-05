const express = require("express");
const mongoose = require("mongoose");
const routerinv = require("./Routes/inventoryRouter"); //Inventory Manager

//Artwork-manager
const router = require("./Routes/artWorkRoutes");

const inquiryrouter = require("./Routes/inquiryRoutes"); //Inquiry-manager
const responserouter = require("./Routes/responseRouter"); //Inquiry Admin
const biddingrouter = require("./Routes/biddingRoutes"); //Bidding-manager
const adminBiddingRouter = require("./Routes/adminBiddingRoute"); //Bidding-admin

const ticketrouter = require("./Routes/ticketRoutes"); //Ticket-manager
const ticketissuesroutes = require("./Routes/ticketIssuesRoutes");

//event
const Artistrouter = require("./Routes/EventRoutes/artistRoutes"); // event
const RequestEventrouter = require("./Routes/EventRoutes/requestEventRoutes"); // event

//user
const bookingUserRoutes = require("./Routes/user.route");

const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());

//Artwork-manager
app.use("/artWorks", router);
app.use("/images", express.static("./file/"));

//Inquiryuser
app.use("/inquiry", inquiryrouter); //inquiry is using the local host 5000/inquiry.

//Inquiry Admin
app.use("/adminResponse", responserouter); //inquiry is using the local host 5000/adminResponse

//Ticket-manager
app.use("/visitors", ticketrouter); //ticket is using the local host 5000/ticket
app.use("/api/messages", ticketissuesroutes);

//Inventory Manager
app.use("/inventory", routerinv); //Mayomi


//Artwork-manager
app.use("/artWorks", router);

//Inquiry-manager
app.use("/inquiry", inquiryrouter); //inquiry is using the local host 5000/inquiry

//bidding manager
app.use("/bidding", biddingrouter); //bidding is using the local host 5000/bidding

//bidding admin
app.use("/Adminbid", adminBiddingRouter); //bidding is using the local host 5000/bidding

//event
app.use("/artist", Artistrouter);
app.use("/requestEvent", RequestEventrouter);

//user
app.use("/artWorks", router);
app.use("/api/bookingUsers", bookingUserRoutes);

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

//Insert Model Part - PDF
require("./Models/paymentReceiptModel");
const pdfSchema = mongoose.model("PaymentReceipt");
const uplode = multer({ storage: storage });

//Insert Model Part in Payment Receipt
app.post("/uploadfile", uplode.single("file"), async (req, res) => {
  console.log(req.file);
  const pdf = req.file.filename;
  try {
    await pdfSchema.create({ pdf: pdf });
    console.log("Payment receipt uploaded successfully");
    res
      .status(200)
      .send({ status: 200, message: "Payment receipt uploaded successfully" });
  } catch (error) {
    console.log("Error Uploading :" + error.message);
    res.status(500).send({ status: 500, message: "Pdf not uploaded" });
  }
});

app.get("/getFile", async (req, res) => {
  try {
    const data = await pdfSchema.find();
    res.status(200).send({ status: 200, data: data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: "Error in getting pdf" });
  }
});

//Image -----
//Image model part
require("./Models/artWorkImgModel");
const ImgSchema = mongoose.model("ArtworkImage");

const multerimg = require("multer");

// const storageimg = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../frontend/src/Components/Artwork Component/ImgUploader/files");
//   },

//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

const uploadimg = multerimg({ storage: storage });

app.post("/uploadImg", uploadimg.single("image"), async (req, res) => {
  console.log(req.body);
  const imageName = req.file.filename;

  try {
    await ImgSchema.create({ image: imageName });
    // res.json({ status: "ok" });
    res
      .status(200)
      .send({ status: 200, message: "Image uploaded successfully" });
  } catch (error) {
    res.json({ status: "error" });
  }
});

// app.get("/getImage", async (req, res) => {
//   try {
//     ImgSchema.find({}).then((data) => {
//       res.send({ status: "ok", data: data });
//     });
//   } catch (error) {
//     res.json({ status: error });
//   }
// });
app.get("/getImage", async (req, res) => {
  try {
    // Find and sort by createdAt in descending order (most recent first)
    const data = await ImgSchema.find({}).sort({ createdAt: -1 });
    res.send({ status: "ok", data: data });
  } catch (error) {
    console.error("Error retrieving images:", error);
    res.json({ status: "error", message: error.message });
  }
});

const inventoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./file"); // folder for inventory images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname); // Save with unique timestamp
  },
});

const uploadInventoryImg = multer({ storage: inventoryStorage });