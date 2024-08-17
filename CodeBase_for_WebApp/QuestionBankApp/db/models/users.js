'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
  users.init({
    userType: {
      type: DataTypes.ENUM('admin', 'teacher'),
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if (value !== this.password) {
          throw new Error("Password and confirm password do not match");
        }
        this.setDataValue('confirmPassword', value);
      }
    }
  }, {
    sequelize,
    modelName: 'users',
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const hash = await bcrypt.hash(user.password, 10);
          user.password = hash;
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const hash = await bcrypt.hash(user.password, 10);
          user.password = hash;
        }
      }
    }
  });

  return users;
};
