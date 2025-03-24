

const express = require("express");
const { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee, getEmployeeBasicDetails } = require("../controllers/employeeController");
const router = express.Router();

router.post("/employees", createEmployee);
router.get("/employees", getEmployees);
router.get("/employees/basic", getEmployeeBasicDetails);
router.get("/employees/:id", getEmployeeById);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

module.exports = router;
