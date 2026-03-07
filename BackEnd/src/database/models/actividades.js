'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class actividades extends Model {
    static associate(models) {
      // Relación: cada actividad pertenece a un usuario (generador / creador)
      actividades.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'generador',
      });

      // Relación uno a muchos con secciones
      actividades.belongsTo(models.secciones, {
        foreignKey: 'seccionesId',
        as: 'secciones',
      });

      // Relación uno a muchos con asistencia
      actividades.hasMany(models.asistencia, {
        as: "actividad",
        foreignKey: "actividadId",
      });
    }
  }
  actividades.init({
    periodo: DataTypes.STRING,
    name: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    seccionesId: DataTypes.JSON,
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