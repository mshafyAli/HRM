const Employee = require("../models/Employee");
const Attandance = require("../models/Attandance");

const createAttandance = async (req, res) => {
  try {
    const {
      employeeId,
      status,
      inTime,
      outTime,
      workingHours,
      remarks,
      halfDay,
      date,
    } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      })
    }

    const newAttandance = new Attandance({
        employee: employeeId,
        status,
        inTime,
        outTime,
        workingHours,
        remarks,
        halfDay,
        date,
    });
    
    await newAttandance.save();
    res.status(201).json({message: "Attandance created successfully",attendance: newAttandance});
  } catch (error) {
    console.error("Error Creating Attandance:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getAllAttandance = async (req,res) => {
    try {
        const attandanceList = await Attandance.find().populate("employee", "name department position");

        res.status(200).json(attandanceList)

    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// GET Attendance by ID
const getAttendanceById = async (req, res) => {
    try {
      const attendance = await Attendance.findById(req.params.id)
        .populate("employee", "name department position");
  
      if (!attendance) {
        return res.status(404).json({ message: "Attendance not found" });
      }
  
      res.status(200).json(attendance);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  // UPDATE Attendance
  const updateAttendance = async (req, res) => {
    try {
      const { status, inTime, outTime, workingHours, remarks, halfDay } = req.body;
  
      const attendance = await Attendance.findById(req.params.id);
      if (!attendance) {
        return res.status(404).json({ message: "Attendance not found" });
      }
  
      // Update fields
      if (status) attendance.status = status;
      if (inTime) attendance.inTime = inTime;
      if (outTime) attendance.outTime = outTime;
      if (workingHours) attendance.workingHours = workingHours;
      if (remarks !== undefined) attendance.remarks = remarks;
      if (halfDay !== undefined) attendance.halfDay = halfDay;
  
      await attendance.save();
  
      res.status(200).json({ message: "Attendance updated successfully", attendance });
    } catch (error) {
      console.error("Error updating attendance:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  // DELETE Attendance
  const deleteAttendance = async (req, res) => {
    try {
      const attendance = await Attendance.findByIdAndDelete(req.params.id);
  
      if (!attendance) {
        return res.status(404).json({ message: "Attendance not found" });
      }
  
      res.status(200).json({ message: "Attendance deleted successfully" });
    } catch (error) {
      console.error("Error deleting attendance:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


module.exports = { createAttandance, getAllAttandance };
