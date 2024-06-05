const express = require('express');
const { createCompany, getCompanies } = require('../controllers/companyController');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/company', authenticateJWT, createCompany);
router.get('/company', authenticateJWT, getCompanies);

module.exports = router;