'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VendorEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'vendor_id', as: 'vendor' });
      this.belongsTo(models.WellnessEvent, { foreignKey: 'wellness_event_id', as: 'wellnessEvent' });
    }
  }
  VendorEvent.init({
    vendor_event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    wellness_event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Approved', 'Rejected'),
      allowNull: false
    },
    remarks: {
      type: DataTypes.STRING
    },
    confirmed_date: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'VendorEvent',
    timestamps: false
  });
  return VendorEvent;
};