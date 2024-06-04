'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.VendorEvent, { foreignKey: 'vendor_id', as: 'vendorEvents' });
      this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company' });
    }
  }
  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('HR', 'Vendor'),
      allowNull: false
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Company ID is optional and only populated for vendors
      references: {
        model: 'Companies',
        key: 'company_id'
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });
  return User;
};