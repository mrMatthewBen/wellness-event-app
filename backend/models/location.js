'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.WellnessEvent, { foreignKey: 'location_id', as: 'wellnessEvents' });
    }
  }
  Location.init({
    location_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street_name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Location',
    timestamps: false
  });
  return Location;
};