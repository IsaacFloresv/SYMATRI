'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    static associate(models) {}
  }
  roles.init({
    nombre: DataTypes.STRING,
    modulos: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};