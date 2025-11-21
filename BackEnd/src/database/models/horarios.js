'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class horarios extends Model {
    static associate(models) {
      // Relación con secciones
      horarios.belongsTo(models.secciones, {
        foreignKey: 'seccionId',
        as: 'seccion',
      });

      // Relación con profesor (User)
      horarios.belongsTo(models.User, {
        foreignKey: 'profesorId',
        as: 'profesor',
      });

    }
  }
  horarios.init({
    periodo: DataTypes.STRING,
    seccionId: DataTypes.INTEGER,
    profesorId: DataTypes.INTEGER,
    dia: DataTypes.STRING,
    inicio: DataTypes.TIME,
    final: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'horarios',
  });
  return horarios;
};