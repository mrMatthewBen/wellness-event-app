const express = require('express');
const { createWellnessEvent, updateWellnessEventStatus, getWellnessEvents, getWellnessEventById } = require('../controllers/wellnessEventController');
const router = express.Router();

// Create a new wellness event
router.post('/wellness-events', createWellnessEvent);

// Vendor approves or rejects a wellness event
router.put('/wellness-events/:id/status', updateWellnessEventStatus);

// Get all wellness events
router.get('/wellness-events', getWellnessEvents);

// Get a single wellness event by ID
router.get('/wellness-events/:id', getWellnessEventById);

module.exports = router;