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
        as: 'materia',
      });
      // relación con grado
      materias.belongsTo(models.grados, {
        foreignKey: 'gradoId',
        as: 'grado',
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
    description: DataTypes.TEXT,
    gradoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'materias',
  });
  return materias;
};