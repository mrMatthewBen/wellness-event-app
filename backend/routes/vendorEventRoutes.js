const express = require('express');
const { updateVendorEventStatus } = require('../controllers/vendorEventController');
const router = express.Router();

// Vendor approves or rejects a wellness event
router.put('/vendor-events/status', updateVendorEventStatus);

module.exports = router;