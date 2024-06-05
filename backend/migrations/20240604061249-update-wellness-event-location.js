'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('WellnessEvents', 'location_id');
    await queryInterface.addColumn('WellnessEvents', 'location', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('WellnessEvents', 'location_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Locations',
        key: 'location_id'
      }
    });
    await queryInterface.removeColumn('WellnessEvents', 'location');
  }
};