const express = require('express');
const { createCompany } = require('../controllers/companyController');
const router = express.Router();

router.post('/company', createCompany);

module.exports = router;