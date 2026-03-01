"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class secciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // relacion con seccionProfesor
      secciones.hasMany(models.seccionProfesor, {
        as: "Seccion",
        foreignKey: "seccionId",
      });

      // relacion con user (profesor responsable)
      secciones.belongsTo(models.user, {
        as: "ProfesorResponsable",
        foreignKey: "profesorId",
      });

      // relacion con actividades
      secciones.hasMany(models.actividades, {
        foreignKey: 'seccionId',
        as: 'secciones',
      });

      // relacion con horarios
      secciones.hasMany(models.horarios, {
        foreignKey: 'seccionId',
        as: 'horarios',
      });

      // relacion con seccionAlumnos
      secciones.hasMany(models.seccionAlumnos, {
        foreignKey: 'seccionId',
        as: 'seccionA',
      });
      // relacion con grado
      secciones.belongsTo(models.grados, {
        foreignKey: 'gradoId',
        as: 'grado',
      });

    }
  }
  secciones.init(
    {
      periodo: DataTypes.STRING,
      name: DataTypes.STRING,
      profesorId: DataTypes.INTEGER,
      gradoId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "secciones",
    }
  );
  return secciones;
};
