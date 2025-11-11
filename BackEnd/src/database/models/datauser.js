'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dataUser extends Model {
    static associate(models) {
      dataUser.belongsTo(models.User, {
        as: "Usuario",
        foreignKey: "userId"
      })
    }
  }
  dataUser.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    telefono: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dataUser',
  });
  return dataUser;
};