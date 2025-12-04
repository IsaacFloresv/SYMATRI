'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mensajes extends Model {
    static associate(models) {
      // Relación con el emisor
      mensajes.belongsTo(models.user, {
        foreignKey: 'emisorId',
        as: 'emisor',
      });
    }
  }
  mensajes.init({
    periodo: DataTypes.STRING,
    asunto: DataTypes.STRING,
    mensaje: DataTypes.TEXT,
    emisorId: DataTypes.INTEGER,
    isReaded: DataTypes.BOOLEAN,
    isArchived: DataTypes.BOOLEAN,
    fechaEnvio: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'mensajes',
  });
  return mensajes;
};