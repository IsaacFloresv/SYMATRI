'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mensajes extends Model {
    static associate(models) {

      // Relación con el emisor
      mensajes.belongsTo(models.User, {
        through: 'mensaje_receptor',
        as: 'receptores',
        foreignKey: 'mensajeId',
        otherKey: 'receptorId'
      });
    }
  }
  mensajes.init({
    asunto: DataTypes.STRING,
    mensaje: DataTypes.TEXT,
    emisorId: DataTypes.INTEGER,
    receptorId: DataTypes.TEXT,
    leido: DataTypes.INTEGER,
    fechaEnvio: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'mensajes',
  });
  return mensajes;
};