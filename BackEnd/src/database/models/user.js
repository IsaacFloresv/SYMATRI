"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Relación uno a uno con dataUser
      User.hasOne(models.dataUser, {
        as: "datosPersonales",
        foreignKey: "userId",
      });

      // Relación uno a muchos con secciones
      User.hasMany(models.secciones, {
        as: "ProfesorResponsable",
        foreignKey: "profesorId",
      });

      // Relación uno a muchos con logs
      User.hasMany(models.logs, {
        as: "logs",
        foreignKey: "userId",
      });

      // Relación uno a muchos con actividades
      User.hasMany(models.actividades, {
        as: "generador",
        foreignKey: "userId",
      });

      // Relación uno a muchos con encargadoAlumnos
      User.hasMany(models.encargadoAlumnos, {
        as: "encargado",
        foreignKey: "encargadoId",
      });

      // Relación uno a muchos con encargadoAlumnos
      User.hasMany(models.encargadoAlumnos, {
        as: "alumno",
        foreignKey: "alumnoId",
      });

      // Relación uno a muchos con horarios
      User.hasMany(models.horarios, {
        foreignKey: 'profesorId',
        as: 'profesor',
      });

      // Relación uno a muchos con materiaProfesor
      User.hasMany(models.materiaProfesor, {
        foreignKey: 'profesorId',
        as: 'profesorAsignado',
      });

      // Relación uno a muchos con mensajes
      User.belongsToMany(models.mensajes, {
        through: 'mensaje_receptor',
        as: 'mensajesRecibidos',
        foreignKey: 'receptorId',
        otherKey: 'mensajeId',
      });

      // Relación uno a muchos con notas
      User.hasMany(models.notas, {
        foreignKey: 'alumnoId',
        as: 'alumnoNota',
      });

      // Relación uno a muchos con notas
      User.hasMany(models.notas, {
        foreignKey: 'usuarioId',
        as: 'autor',
      });

      // Relación uno a muchos con seccionAlumnos
      User.hasMany(models.seccionAlumnos, {
        foreignKey: 'alumnoId',
        as: 'alumnoS',
      });

      // Relación uno a muchos con seccionProfesor
      User.hasMany(models.seccionProfesor, {
        foreignKey: 'profesorId',
        as: 'Profesor',
      });

      // Relación uno a muchos con mensajeReceptors
      User.hasMany(models.mensajeReceptors, {
        foreignKey: 'receptorId',
        as: 'receptor',
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
