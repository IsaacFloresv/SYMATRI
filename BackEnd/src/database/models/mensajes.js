'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mensajes extends Model {
    static associate(models) {
      // define association here
    }
  }
  mensajes.init({
    asunto: DataTypes.STRING,
    mensaje: DataTypes.TEXT,
    emisorId: DataTypes.INTEGER,
    receptorId: DataTypes.INTEGER,
    leido: DataTypes.BOOLEAN,
    fechaEnvio: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'mensajes',
  });
  return mensajes;
};