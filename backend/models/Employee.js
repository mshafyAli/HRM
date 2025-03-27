const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    number: { type: String, required: true }, 
    emergencyNumber: { type: String, required: true }, 
    address: { type: String, required: true }, 
    dateOfJoining: { type: String, required: true }
  },  
  { timestamps: true }
);

const Employee = mongoose.model("Employee", EmployeeSchema)

module.exports = Employee
