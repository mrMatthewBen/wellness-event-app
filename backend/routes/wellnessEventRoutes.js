const express = require("express");
const authenticateJWT = require('../middleware/authMiddleware');
const {
  createWellnessEvent,
  updateWellnessEventStatus,
  getWellnessEvents,
  getWellnessEventById,
  getWellnessEventsByCompany,
} = require("../controllers/wellnessEventController");
const router = express.Router();

// Create a new wellness event
router.post("/wellness-events", authenticateJWT, createWellnessEvent);

// Vendor approves or rejects a wellness event
router.put("/wellness-events/:id/status", authenticateJWT, updateWellnessEventStatus);

// Get all wellness events
router.get("/wellness-events", authenticateJWT, getWellnessEvents);

// Get wellness events filtered by company ID with pagination
router.get("/wellness-events/by-company", authenticateJWT, getWellnessEventsByCompany);

// Get a single wellness event by ID
router.get("/wellness-events/:id", authenticateJWT, getWellnessEventById);

module.exports = router;
