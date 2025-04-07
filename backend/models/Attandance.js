const mongoose = require("mongoose");

const AttandanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "Holiday", "Leave"],
      default: "Absent",
    },
    inTime: { type: String, default: "--:-- --" },
    outTime: { type: String, default: "--:-- --" },
    workingHours: { type: String, default: "-" },
    remarks: { type: String, default: "" },
    halfDay: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    day: {
      type: String,
      default: function () {
        return new Date(this.date).toLocaleDateString("en-US", { weekday: "long" });
      },
    },

  },
  { timestamps: true }
);

const Attandance = mongoose.model("Attandance", AttandanceSchema);
module.exports = Attandance;
