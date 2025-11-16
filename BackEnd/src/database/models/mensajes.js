'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mensajes extends Model {
    static associate(models) {
      // Relación con el emisor
      mensajes.belongsTo(models.User, {
        foreignKey: 'emisorId',
        as: 'emisor',
      });

      // Relación con el receptor
      mensajes.belongsTo(models.User, {
        foreignKey: 'receptorId',
        as: 'receptor',
      });

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