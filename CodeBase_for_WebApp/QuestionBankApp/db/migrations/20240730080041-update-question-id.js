// migrations/[timestamp]-update-question-id.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Check if the sequence already exists
      const [results] = await queryInterface.sequelize.query(
        `SELECT EXISTS (
          SELECT 1
          FROM pg_class
          WHERE relname = 'questions_id_seq'
        )`,
        { transaction }
      );

      const sequenceExists = results[0].exists;

      // Create the sequence if it doesn't exist
      if (!sequenceExists) {
        await queryInterface.sequelize.query(
          `CREATE SEQUENCE questions_id_seq OWNED BY "Questions".id`,
          { transaction }
        );
      }

      // Alter the column to use the sequence
      await queryInterface.sequelize.query(
        `ALTER TABLE "Questions" ALTER COLUMN id SET DEFAULT nextval('questions_id_seq')`,
        { transaction }
      );
      
      // Alter the column to be an INTEGER
      await queryInterface.changeColumn('Questions', 'id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false, // It's managed by the sequence
        primaryKey: true
      }, { transaction });
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Revert the column change
      await queryInterface.changeColumn('Questions', 'id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
        primaryKey: false
      }, { transaction });
      
      // Drop the sequence if it exists
      await queryInterface.sequelize.query(
        `DROP SEQUENCE IF EXISTS questions_id_seq`,
        { transaction }
      );
    });
  }
};
