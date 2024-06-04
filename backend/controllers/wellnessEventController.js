const { WellnessEvent, Company, Event, Location, VendorEvent } = require('../models');

// Create a new wellness event
exports.createWellnessEvent = async (req, res) => {
    try {
        const { company_id, event_id, proposed_date1, proposed_date2, proposed_date3, location_id } = req.body;
        
        const wellnessEvent = await WellnessEvent.create({
            company_id,
            event_id,
            proposed_date1,
            proposed_date2,
            proposed_date3,
            location_id,
            date_created: new Date(),
            status: 'Pending'
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
            return res.status(404).json({ error: 'Wellness Event not found' });
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
        const wellnessEvents = await WellnessEvent.findAll({
            include: ['company', 'event', 'location']
        });
        res.json(wellnessEvents);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single wellness event by ID
exports.getWellnessEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const wellnessEvent = await WellnessEvent.findByPk(id, {
            include: ['company', 'event', 'location']
        });
        if (!wellnessEvent) {
            return res.status(404).json({ error: 'Wellness Event not found' });
        }
        res.json(wellnessEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};