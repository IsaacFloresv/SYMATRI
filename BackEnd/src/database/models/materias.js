'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class materias extends Model {
    static associate(models) {
      // Relación con materiaProfesor
      materias.hasMany(models.materiaProfesor, {
        foreignKey: 'materiaId',
        as: 'profesoresAsignados',
      });

      // Relación con notas
      materias.hasMany(models.notas, {
        foreignKey: 'materiaId',
        as: 'notasMateria',
      });
    }
  }
  materias.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'materias',
  });
  return materias;
};