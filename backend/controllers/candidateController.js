const Candidate = require("../models/Candidate");

const createCandidate = async (req, res) => {
  try {
    const newEmployee = new Candidate(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCandidates = async (req, res) => {
  try {
    const employees = await Candidate.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCandidateById = async (req, res) => {
  try {
    const employee = await Candidate.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCandidate = async (req, res) => {
  try {
    const updatedEmployee = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCandidate,getCandidates, getCandidateById, updateCandidate, deleteCandidate };
