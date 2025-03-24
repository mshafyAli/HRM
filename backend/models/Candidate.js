const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique
  },
  phone: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Interviewing", "Hired", "Rejected"], // Restricts values
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now, // Defaults to current date
  },
});

const Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;
