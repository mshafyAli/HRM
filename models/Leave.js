import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    type: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
});

module.exports = mongoose.model('Leave', LeaveSchema);
