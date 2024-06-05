const { Event } = require('../models');

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}