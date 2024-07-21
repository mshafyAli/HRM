
import mongoose from "mongoose";

const PayrollSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    salary: { type: Number, required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    dateIssued: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payroll', PayrollSchema);
