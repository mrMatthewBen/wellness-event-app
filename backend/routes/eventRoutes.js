const express = require('express');
const { getEvents } = require('../controllers/eventController');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/event', authenticateJWT, getEvents);

module.exports = router;