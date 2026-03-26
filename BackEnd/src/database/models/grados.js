'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class grados extends Model {
    static associate(models) {
      // Relación con materias
      grados.hasMany(models.materias, {
        foreignKey: 'gradoId',
        as: 'materiasAsignadas',
      });
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