'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Questions', 'explanation');
    await queryInterface.removeColumn('Questions', 'options');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Questions', 'explanation', {
      type: Sequelize.TEXT,
    });
    await queryInterface.addColumn('Questions', 'options', {
      type: Sequelize.JSON,
    });
  }
};
