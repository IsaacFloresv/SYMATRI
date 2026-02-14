'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class horarios extends Model {
    static associate(models) {
      // Relación con secciones: `seccionId` es la FK numérica que apunta a `secciones.id`
      horarios.belongsTo(models.secciones, {
        foreignKey: 'seccionId',
        as: 'seccion',
      });

      // Relación con profesor (User): `profesorId` refiere al usuario que imparte la clase
      horarios.belongsTo(models.user, {
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