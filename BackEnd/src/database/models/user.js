"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.dataUser, {
        as: "datosPersonales",
        foreignKey: "userId",
      });
      User.hasMany(models.secciones, {
        as: "ProfesorResponsable",
        foreignKey: "profesorId",
      });
    }
  }
  User.init(
    {
      userName: DataTypes.STRING,
      pass: DataTypes.STRING,
      email: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      roleId: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      }
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
