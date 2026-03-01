'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class grados extends Model {
    static associate(models) {
      // future associations (e.g. secciones) can be defined here
    }
  }
  grados.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    level: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'grados',
  });
  return grados;
};