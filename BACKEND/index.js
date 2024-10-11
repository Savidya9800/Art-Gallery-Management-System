const express = require("express");
const mongoose = require("mongoose");
const routerinv = require("./Routes/inventoryRouter"); //Inventory Manager
const cartrouter = require("./Routes/CartRoutes"); //Inventory Manager

//Artwork-manager
const router = require("./Routes/artWorkRoutes");

//Inquiry-manager
const inquiryrouter = require("./Routes/inquiryRoutes"); //Inquiry-manager
const responserouter = require("./Routes/responseRouter"); //Inquiry Admin

//Bidding-manager
const biddingrouter = require("./Routes/biddingRoutes"); //Bidding-manager
const adminBiddingRouter = require("./Routes/adminBiddingRoute"); //Bidding-admin

//Ticket-manager
const ticketrouter = require("./Routes/ticketRoutes");
const ticketissuesroutes = require("./Routes/ticketIssuesRoutes");
const Visitor = require("./Models/ticketModel");


//event
const Artistrouter = require('./Routes/EventRoutes/artistRoutes') // event 
const RequestEventrouter = require('./Routes/EventRoutes/requestEventRoutes') // event

//user
const bookingUserRoutes = require("./Routes/user.route");
const membershipRoutes = require("./Routes/membershipRoutes"); //Membership Manager

//Finance
const financeRouter = require("./Routes/financeRouter"); // event
const transactionRouter = require("./Routes/transactionRoutes"); // event

const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());

//Inventory Manager
app.use("/inventory", routerinv); //Mayomi

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
app.use("/cart",cartrouter);

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
app.use("/api/bookingUsers", bookingUserRoutes);
app.use("/api/membership", membershipRoutes);

//cart
const Cart = require("./Routes/CartRoutes");

//Financial Manager
app.use("/finance", financeRouter); 
app.use('/transaction', transactionRouter);

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

//Artwork Manager
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

//Image model part
require("./Models/artWorkImgModel");
const ImgSchema = mongoose.model("ArtworkImage");

const multerimg = require("multer");

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
    cb(null, "./file"); // Make sure this folder exists and is writable
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname); // Save with unique timestamp
  },
});

const uploadInventoryImg = multer({ storage: inventoryStorage });
app.post("/uploadInventoryImage", uploadInventoryImg.single("image"), async (req, res) => {
  console.log(req.file);
  const imageName = req.file.filename;

  try {
    await InventorySchema.create({ image: imageName, ...otherInventoryFields });
    res.status(200).send({ status: 200, message: "Inventory image uploaded successfully" });
  } catch (error) {
    console.log("Error uploading inventory image:", error.message);
    res.status(500).send({ status: 500, message: "Image not uploaded" });
  }
});

// Visitor count route
app.get('/api/visitorCount', async (req, res) => {
  try {
    const { date } = req.query;

    // Query the database to get the total number of visitors for the selected date
    const visitorCount = await Visitor.countDocuments({ date });

    res.json({ count: visitorCount });
  } catch (err) {
    console.error('Error fetching visitor count:', err);
    res.status(500).send('Server error');
  }
});

//updated
// Remaining slots route
app.get('/remainingSlots', async (req, res) => {
  try {
    const { date } = req.query;

    // Query the database to get all visitors for the selected date
    const visitors = await Visitor.find({ date });

    // Create an object to hold the remaining slots per time slot
    const timeSlots = {
      "8.30": 10,
      "12.30": 10,
      "3.30": 10,
    };

    // Reduce the available slots by the number of tickets for each time slot
    visitors.forEach((visitor) => {
      if (timeSlots[visitor.time] !== undefined) {
        const totalTickets = visitor.tickets.reduce((sum, ticket) => sum + ticket.count, 0);
        timeSlots[visitor.time] -= totalTickets;
      }
    });

    res.json({ slots: timeSlots });
  } catch (err) {
    console.error('Error fetching remaining slots:', err);
    res.status(500).send('Server error');
  }
});

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;
 
  
  try {
    const response = await sendEmail(to, subject, text);
    res.status(200).send({ message: 'Email sent successfully', response });
  } catch (error) {
    res.status(500).send({ message: 'Error sending email', error: error.message });
  }
});



