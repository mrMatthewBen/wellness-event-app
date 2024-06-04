'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('WellnessEvents', 'proposed_date1');
    await queryInterface.removeColumn('WellnessEvents', 'proposed_date2');
    await queryInterface.removeColumn('WellnessEvents', 'proposed_date3');
    await queryInterface.addColumn('WellnessEvents', 'proposed_dates', {
      type: Sequelize.ARRAY(Sequelize.DATE),
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('WellnessEvents', 'proposed_date1', {
      type: Sequelize.DATE,
      allowNull: false
    });
    await queryInterface.addColumn('WellnessEvents', 'proposed_date2', {
      type: Sequelize.DATE,
      allowNull: false
    });
    await queryInterface.addColumn('WellnessEvents', 'proposed_date3', {
      type: Sequelize.DATE,
      allowNull: false
    });
    await queryInterface.removeColumn('WellnessEvents', 'proposed_dates');
  }
};