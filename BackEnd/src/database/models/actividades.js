'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class actividades extends Model {
    static associate(models) {
      // Relación: cada actividad pertenece a un usuario
      actividades.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'generador',
      });
    }
  }
  actividades.init({
    name: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN,
    fechaInicio: DataTypes.DATEONLY,
    fechaFinal: DataTypes.DATEONLY,
    horaInicio: DataTypes.TIME,
    horaFinal: DataTypes.TIME,
    ubicacion: DataTypes.STRING,
    objetivo: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'actividades',
  });
  return actividades;
};