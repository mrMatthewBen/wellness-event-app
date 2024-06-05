const { WellnessEvent } = require("../models");

// Create a new wellness event
exports.createWellnessEvent = async (req, res) => {
  try {
    const { company_id, event_id, proposed_dates, location } = req.body;

    const wellnessEvent = await WellnessEvent.create({
      company_id,
      event_id,
      proposed_dates,
      location,
      date_created: new Date(),
      status: "Pending",
    });

    res.status(201).json(wellnessEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Vendor approves or rejects an event
exports.updateWellnessEventStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks, confirmed_date } = req.body;

    const wellnessEvent = await WellnessEvent.findByPk(id);
    if (!wellnessEvent) {
      return res.status(404).json({ error: "Wellness Event not found" });
    }

    wellnessEvent.status = status;
    wellnessEvent.remarks = remarks;
    wellnessEvent.confirmed_date = confirmed_date;

    await wellnessEvent.save();
    res.json(wellnessEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all wellness events
exports.getWellnessEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default values if not provided
    const offset = (page - 1) * limit;

    const wellnessEvents = await WellnessEvent.findAndCountAll({
      include: ["company", "event"],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      total: wellnessEvents.count,
      pages: Math.ceil(wellnessEvents.count / limit),
      currentPage: page,
      data: wellnessEvents.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get wellness events filtered by company ID with pagination
exports.getWellnessEventsByCompany = async (req, res) => {
  try {
    const { company_id, page = 1, limit = 10 } = req.query; // Default values if not provided
    const offset = (page - 1) * limit;

    if (!company_id) {
      return res.status(400).json({ error: "company_id is required" });
    }

    const wellnessEvents = await WellnessEvent.findAndCountAll({
      where: { company_id },
      include: ["company", "event"],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      total: wellnessEvents.count,
      pages: Math.ceil(wellnessEvents.count / limit),
      currentPage: page,
      data: wellnessEvents.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single wellness event by ID
exports.getWellnessEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const wellnessEvent = await WellnessEvent.findByPk(id, {
      include: ["company", "event", "location"],
    });
    if (!wellnessEvent) {
      return res.status(404).json({ error: "Wellness Event not found" });
    }
    res.json(wellnessEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
