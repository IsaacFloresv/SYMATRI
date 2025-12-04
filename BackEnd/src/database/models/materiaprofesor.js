'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class materiaProfesor extends Model {
    static associate(models) {
      // Relación con materia
      materiaProfesor.belongsTo(models.materias, {
        foreignKey: 'materiaId',
        as: 'materia',
      });

      // Relación con profesor (User)
      materiaProfesor.belongsTo(models.user, {
        foreignKey: 'profesorId',
        as: 'profesorAsignado',
      });

    }
  }
  materiaProfesor.init({
    materiaId: DataTypes.INTEGER,
    profesorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'materiaProfesor',
  });
  return materiaProfesor;
};