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
      secciones.hasMany(models.seccionProfesor, {
        as: "Seccion",
        foreignKey: "seccionId",
      });

      secciones.belongsTo(models.User, {
        as: "ProfesorResponsable",
        foreignKey: "profesorId",
      });
    }
  }
  secciones.init(
    {
      name: DataTypes.STRING,
      profesorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "secciones",
    }
  );
  return secciones;
};
