const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/artWorkRoutes");
const bookingUserRoutes = require("./Routes/user.route");
const cors = require("cors");
const app = express();

//Middleware
app.use(express.json());
app.use(cors());
///routes
app.use("/artWorks", router);
app.use("/api/bookingUsers", bookingUserRoutes);

//DB Connection
//DB pw-: ohYTKpIAkkGLhNTd
mongoose
  .connect("mongodb+srv://admin:ohYTKpIAkkGLhNTd@cluster0.omv4o.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5001);
  })
  .catch((err) => console.log(err));
