'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Drop the existing id column
    await queryInterface.removeColumn('Questions', 'id');

    // Step 2: Add a new id column as INTEGER with auto-increment and primary key
    await queryInterface.addColumn('Questions', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Step 1: Drop the new id column added in the up migration
    await queryInterface.removeColumn('Questions', 'id');

    // Step 2: Add back the id column as UUID with its original settings
    await queryInterface.addColumn('Questions', 'id', {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    });
  }
};
