const { VendorEvent, WellnessEvent, User } = require('../models');

// Vendor approves or rejects an event
exports.updateVendorEventStatus = async (req, res) => {
    try {
        const { wellness_event_id, vendor_id, status, remarks, confirmed_date } = req.body;

        // Find or create the VendorEvent entry
        let vendorEvent = await VendorEvent.findOne({
            where: { wellness_event_id, vendor_id }
        });

        if (!vendorEvent) {
            vendorEvent = await VendorEvent.create({
                wellness_event_id,
                vendor_id,
                status,
                remarks,
                confirmed_date
            });
        } else {
            vendorEvent.status = status;
            vendorEvent.remarks = remarks;
            vendorEvent.confirmed_date = confirmed_date;
            await vendorEvent.save();
        }

        // Update the status of the wellness event if necessary
        const wellnessEvent = await WellnessEvent.findByPk(wellness_event_id);
        if (!wellnessEvent) {
            return res.status(404).json({ error: 'Wellness Event not found' });
        }
        wellnessEvent.status = status;
        wellnessEvent.remarks = remarks;
        wellnessEvent.confirmed_date = confirmed_date;
        await wellnessEvent.save();

        res.json(vendorEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};