'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Questions', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },  
      question: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      options: {
        type: Sequelize.JSON,
        allowNull: false
      },
      answer: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      LOD:{
        type: Sequelize.ENUM('Easy', 'Moderate', 'Difficult'),
        allowNull: false

      },
      explanation: {
        type: Sequelize.TEXT
      },
      subjectId: {
        type: Sequelize.UUID,
        references: {
          model: 'Subjects',
          key: 'subjectId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      gradeId: {
        type: Sequelize.UUID,
        references: {
          model: 'Grades',
          key: 'gradeId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      bloomsTaxonomyLevel: {
        type: Sequelize.ENUM('Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Questions');
  }
};
