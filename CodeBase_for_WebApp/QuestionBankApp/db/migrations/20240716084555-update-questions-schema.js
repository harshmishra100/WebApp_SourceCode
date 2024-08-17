'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Questions', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Default Type'
    });
    await queryInterface.addColumn('Questions', 'topic', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Default Topic'
    });
    await queryInterface.addColumn('Questions', 'difficulty', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Medium'
    });
    await queryInterface.addColumn('Questions', 'bloom_taxonomy', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Remember'
    });
    await queryInterface.addColumn('Questions', 'grade', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Default Grade'
    });
    await queryInterface.addColumn('Questions', 'subject', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Default Subject'
    });

    await queryInterface.removeColumn('Questions', 'LOD');
    await queryInterface.removeColumn('Questions', 'bloomsTaxonomyLevel');
    await queryInterface.removeColumn('Questions', 'gradeId');
    await queryInterface.removeColumn('Questions', 'subjectId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Questions', 'type');
    await queryInterface.removeColumn('Questions', 'topic');
    await queryInterface.removeColumn('Questions', 'difficulty');
    await queryInterface.removeColumn('Questions', 'bloom_taxonomy');
    await queryInterface.removeColumn('Questions', 'grade');
    await queryInterface.removeColumn('Questions', 'subject');

    await queryInterface.addColumn('Questions', 'LOD', {
      type: Sequelize.ENUM('Easy', 'Moderate', 'Difficult'),
      allowNull: false
    });
    await queryInterface.addColumn('Questions', 'bloomsTaxonomyLevel', {
      type: Sequelize.ENUM('Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'),
      allowNull: false
    });
    await queryInterface.addColumn('Questions', 'gradeId', {
      type: Sequelize.UUID,
      references: {
        model: 'Grades',
        key: 'gradeId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('Questions', 'subjectId', {
      type: Sequelize.UUID,
      references: {
        model: 'Subjects',
        key: 'subjectId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  }
};
