'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    static associate(models) {
      // relacion con users
      roles.hasMany(models.user, {
        as: "usuario",
        foreignKey: "roleId",
      });      
    }
  }
  roles.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    modulos: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};