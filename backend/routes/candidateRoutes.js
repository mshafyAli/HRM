

const express = require("express");
const { createCandidate,getCandidates, getCandidateById, updateCandidate, deleteCandidate } = require("../controllers/candidateController");

const router = express.Router();

router.post("/candidates", createCandidate);
router.get("/candidates", getCandidates);
router.get("/candidates/:id", getCandidateById);
router.put("/candidates/:id", updateCandidate);
router.delete("/candidates/:id", deleteCandidate);

module.exports = router;
