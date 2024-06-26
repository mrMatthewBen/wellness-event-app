const { Company } = require("../models");

exports.createCompany = async (req, res) => {
  try {
    const { company_name } = req.body;

    const company = await Company.create({
      company_name,
    });

    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
