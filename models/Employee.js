import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name!'],
  },
  position: {
    type: String,
    required: [true, 'Please enter your position!'],
  },
  department: {
    type: String,
    required: [true, 'Please enter your department!'],
  },
  salary: {
    type: Number,
    required: [true, 'Please enter your salary!'],
  },
  dateOfJoining: {
    type: Date,
    default: Date.now,
  },

});

export default mongoose.model('Employee', employeeSchema);
