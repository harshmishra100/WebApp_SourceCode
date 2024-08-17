module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
   
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Default Type',
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Default Topic',
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Medium',
    },
    bloom_taxonomy: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Remember',
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Default Grade',
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Default Subject',
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  }, {
    timestamps: true, // Ensure Sequelize auto-generates createdAt and updatedAt
  });

  return Question;
};
