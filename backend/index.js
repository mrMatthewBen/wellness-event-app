const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const wellnessEventRoutes = require('./routes/wellnessEventRoutes');
const vendorEventRoutes = require('./routes/vendorEventRoutes');
const companyRoutes = require('./routes/companyRoutes');
const eventRoutes = require('./routes/eventRoutes');
// const { Company, Event, Location, User, WellnessEvent, VendorEvent } = require('./models'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', wellnessEventRoutes);
app.use('/api', vendorEventRoutes);
app.use('/api', companyRoutes);
app.use('/api', eventRoutes);

db.sequelize.sync().then(() => {
  console.log('Database synced successfully.');

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to sync the database:', err);
});