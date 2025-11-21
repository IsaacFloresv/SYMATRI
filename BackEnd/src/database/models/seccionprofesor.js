'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class seccionProfesor extends Model {
    static associate(models) {
      seccionProfesor.belongsTo(models.User, {
        as: "Profesor",
        foreignKey: "profesorId"
      });

      seccionProfesor.belongsTo(models.secciones, {
        as: "Seccion",
        foreignKey: "seccionId"
      });
    }
  }
  seccionProfesor.init({
    periodo: DataTypes.STRING,
    seccionId: DataTypes.INTEGER,
    profesorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'seccionProfesor',
  });
  return seccionProfesor;
};