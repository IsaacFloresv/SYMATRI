'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipoNotas extends Model {
    static associate(models) {
      // tipoNotas 1 - N notas
      tipoNotas.hasMany(models.notas, {
        foreignKey: 'tipoId',
        as: 'notas',
      });
    }
  }
  tipoNotas.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'tipoNotas',
  });
  return tipoNotas;
};
