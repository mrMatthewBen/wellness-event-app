'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WellnessEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company' });
      this.belongsTo(models.Event, { foreignKey: 'event_id', as: 'event' });
      this.belongsTo(models.Location, { foreignKey: 'location_id', as: 'location' });
      this.hasMany(models.VendorEvent, { foreignKey: 'wellness_event_id', as: 'vendorEvents' });
    }
  }
  WellnessEvent.init({
    wellness_event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    proposed_dates: {
      type: DataTypes.ARRAY(DataTypes.DATE),
      allowNull: false
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
      defaultValue: 'Pending'
    },
    remarks: {
      type: DataTypes.STRING
    },
    confirmed_date: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'WellnessEvent',
    timestamps: false
  });
  return WellnessEvent;
};