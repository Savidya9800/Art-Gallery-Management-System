const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


//db insertions
const bookingUserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    role: { type: String, enum: ["artist", "user", "admin"], default: "user" },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password
bookingUserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to check password validity
bookingUserSchema.methods.isPasswordValid = async function (password) {
  return bcrypt.compare(password, this.password);
};

const BookingUser = mongoose.model("BookingUser", bookingUserSchema);
module.exports = BookingUser;
