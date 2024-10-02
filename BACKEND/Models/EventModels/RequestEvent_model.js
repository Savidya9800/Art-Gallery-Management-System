const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestEventSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: Number, required: true },
  memberCount: { type: Number, required: true },
  message: { type: String, required: true },
  eventDate: { type: Date, required: true },
  status: { type: String, default: 'pending' },
  budget: { type: Number, required: true }, 
  packageName:{type: String, required: true}// New field for budget
});

// Create a RequestEvent model based on the schema
const RequestEvent = mongoose.model("RequestEvent", RequestEventSchema);

module.exports = RequestEvent;
