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

      /*
       * Nota: `seccionesId` en esta tabla está modelado como JSON (puede contener
       * un listado de secciones o nombres de sección). Esto permite asignar una
       * actividad a varias secciones. La asociación inversa en `secciones` usa
       * `seccionId` (FK singular) — esa asociación es distinta y no mapea
       * directamente sobre `seccionesId`.
       *
       * Para buscar actividades por `seccionId` desde el controlador, se debe:
       *  - resolver el `name` de la sección (p. ej. '7-1') y usar JSON_CONTAINS
       *    sobre `seccionesId`, o
       *  - añadir un campo `seccionId` si la entidad debe pertenecer a una única
       *    sección (cambio de esquema que requiere migración).
       */
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