const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const wellnessEventRoutes = require('./routes/wellnessEventRoutes');
const companyRoutes = require('./routes/companyRoutes');
// const { Company, Event, Location, User, WellnessEvent, VendorEvent } = require('./models'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', wellnessEventRoutes);
app.use('/api', vendorEventRoutes);
app.use('/api', companyRoutes);

db.sequelize.sync({ force: true }).then(() => {
  console.log('Database synced successfully.');

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to sync the database:', err);
});