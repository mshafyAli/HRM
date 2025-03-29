

const express = require("express");
const { createAttandance, getAllAttandance, getAttandanceById  ,updateAttandance,deleteAttandance, markAttandance, getEmployeeAttandance} = require("../controllers/attandanceController");
const router = express.Router();

router.post("/attandance", createAttandance);
router.post("/markAttandance", markAttandance);
router.get("/attandance/:employeeId", getEmployeeAttandance);
router.get("/attandance", getAllAttandance);
router.get("/attandance/:id", getAttandanceById);
router.put("/attandance/:id", updateAttandance);
router.delete("/attandance/:id", deleteAttandance);

module.exports = router;
