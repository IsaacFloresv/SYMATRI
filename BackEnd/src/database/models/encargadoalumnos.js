'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class encargadoAlumnos extends Model {
    static associate(models) {
      // Un encargadoAlumnos pertenece a un alumno
      encargadoAlumnos.belongsTo(models.user, {
        foreignKey: 'alumnoId',
        as: 'alumno',
      });

      // Un encargadoAlumnos pertenece a un encargado
      encargadoAlumnos.belongsTo(models.user, {
        foreignKey: 'encargadoId',
        as: 'encargado',
      });
    }
  }
  encargadoAlumnos.init({
    alumnoId: DataTypes.INTEGER,
    encargadoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'encargadoAlumnos',
  });
  return encargadoAlumnos;
};