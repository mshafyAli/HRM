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
    res.status(201).json({message: "Attandance created successfully",attandance: newAttandance});
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
        console.error("Error fetching attandance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// GET attandance by ID
const getAttandanceById = async (req, res) => {
  
    try {
      const attandance = await Attandance.findById(req.params.id)
        .populate("employee", "name department position");
        
  
      if (!attandance) {
        return res.status(404).json({ message: "attandance not found" });
      }
  
      res.status(200).json(attandance);
    } catch (error) {
      console.error("Error fetching attandance:", error);
      res.status(500).json({ message: "Internal Server Error" });

    }
  };
  
  // UPDATE attandance
  const updateAttandance = async (req, res) => {
    try {
      const { status, inTime, outTime, workingHours, remarks, halfDay } = req.body;
  
      const attandance = await Attandance.findById(req.params.id);
      if (!attandance) {
        return res.status(404).json({ message: "attandance not found" });
      }
  
      // Update fields
      if (status) attandance.status = status;
      if (inTime) attandance.inTime = inTime;
      if (outTime) attandance.outTime = outTime;
      if (workingHours) attandance.workingHours = workingHours;
      if (remarks !== undefined) attandance.remarks = remarks;
      if (halfDay !== undefined) attandance.halfDay = halfDay;
  
      await attandance.save();
  
      res.status(200).json({ message: "attandance updated successfully", attandance });
    } catch (error) {
      console.error("Error updating attandance:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  // DELETE attandance
  const deleteAttandance = async (req, res) => {
    try {
      const attandance = await Attandance.findByIdAndDelete(req.params.id);
  
      if (!attandance) {
        return res.status(404).json({ message: "attandance not found" });
      }
  
      res.status(200).json({ message: "attandance deleted successfully" });
    } catch (error) {
      console.error("Error deleting attandance:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


module.exports = { createAttandance, getAllAttandance, getAttandanceById  ,updateAttandance,deleteAttandance };
