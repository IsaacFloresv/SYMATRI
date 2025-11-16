'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class seccionAlumnos extends Model {
    static associate(models) {
      // Relación con la sección
      seccionAlumnos.belongsTo(models.secciones, {
        foreignKey: 'seccionId',
        as: 'seccion',
      });

      // Relación con el alumno (User)
      seccionAlumnos.belongsTo(models.User, {
        foreignKey: 'alumnoId',
        as: 'alumno',
      });

    }
  }
  seccionAlumnos.init({
    seccionId: DataTypes.INTEGER,
    alumnoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'seccionAlumnos',
  });
  return seccionAlumnos;
};