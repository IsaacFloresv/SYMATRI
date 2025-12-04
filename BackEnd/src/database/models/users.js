"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // Relación uno a uno con dataUser
      user.hasOne(models.dataUser, {
        as: "datosPersonales",
        foreignKey: "userId",
      });

      // Relación uno a muchos con secciones
      user.hasMany(models.secciones, {
        as: "ProfesorResponsable",
        foreignKey: "profesorId",
      });

      // Relación uno a muchos con logs
      user.hasMany(models.logs, {
        as: "logs",
        foreignKey: "userId",
      });

      // Relación uno a muchos con actividades
      user.hasMany(models.actividades, {
        as: "generador",
        foreignKey: "userId",
      });

      // Relación uno a muchos con encargadoAlumnos
      user.hasMany(models.encargadoAlumnos, {
        as: "encargado",
        foreignKey: "encargadoId",
      });

      // Relación uno a muchos con encargadoAlumnos
      user.hasMany(models.encargadoAlumnos, {
        as: "alumno",
        foreignKey: "alumnoId",
      });

      // Relación uno a muchos con horarios
      user.hasMany(models.horarios, {
        foreignKey: 'profesorId',
        as: 'profesor',
      });

      // Relación uno a muchos con materiaProfesor
      user.hasMany(models.materiaProfesor, {
        foreignKey: 'profesorId',
        as: 'profesorAsignado',
      });

      // Relación uno a muchos con mensajes
      user.belongsToMany(models.mensajes, {
        through: 'mensaje_receptor',
        as: 'mensajesRecibidos',
        foreignKey: 'receptorId',
        otherKey: 'mensajeId',
      });

      // Relación uno a muchos con notas
      user.hasMany(models.notas, {
        foreignKey: 'alumnoId',
        as: 'alumnoNota',
      });

      // Relación uno a muchos con notas
      user.hasMany(models.notas, {
        foreignKey: 'usuarioId',
        as: 'autor',
      });

      // Relación uno a muchos con seccionAlumnos
      user.hasMany(models.seccionAlumnos, {
        foreignKey: 'alumnoId',
        as: 'alumnoS',
      });

      // Relación uno a muchos con seccionProfesor
      user.hasMany(models.seccionProfesor, {
        foreignKey: 'profesorId',
        as: 'Profesor',
      });

      // Relación uno a muchos con mensajeReceptors
      user.hasMany(models.mensajeReceptors, {
        foreignKey: 'receptorId',
        as: 'receptor',
      });

      // Relación uno a muchos con asistencia
      user.hasMany(models.asistencia, {
        as: "alumnoAsistente",
        foreignKey: "alumnoId",
      });

      // Relación uno a muchos con asistencia
      user.hasMany(models.asistencia, {
        as: "registrador",
        foreignKey: "profesorId",
      });

    }
  }
  user.init(
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
      modelName: "user",
    }
  );
  return user;
};
