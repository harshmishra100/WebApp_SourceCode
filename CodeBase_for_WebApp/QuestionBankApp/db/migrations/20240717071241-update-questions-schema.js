'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Questions', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Questions', 'id');
  }
};
