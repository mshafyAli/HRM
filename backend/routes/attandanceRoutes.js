

const express = require("express");
const { createAttandance, getAllAttandance, getAttandanceById  ,updateAttandance,deleteAttandance} = require("../controllers/attandanceController");
const router = express.Router();

router.post("/attandance", createAttandance);
router.get("/attandance", getAllAttandance);
router.get("/attandance/:id", getAttandanceById);
router.put("/attandance/:id", updateAttandance);
router.delete("/attandance/:id", deleteAttandance);

module.exports = router;
