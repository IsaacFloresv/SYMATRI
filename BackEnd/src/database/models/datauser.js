'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dataUser extends Model {
    static associate(models) {
      // relacion con users
      dataUser.belongsTo(models.user, {
        as: "Usuario",
        foreignKey: "userId"
      });
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