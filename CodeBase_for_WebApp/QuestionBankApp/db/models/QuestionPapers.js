'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionPaper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QuestionPaper.init({
    questionPaperId: DataTypes.UUID,
    userId: DataTypes.UUID,
    title: DataTypes.STRING,
    instructions: DataTypes.TEXT,
    questions: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'QuestionPaper',
  });
  return QuestionPaper;
};