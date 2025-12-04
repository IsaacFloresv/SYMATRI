'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logs extends Model {
    static associate(models) {
      // Relación: cada log pertenece a un usuario
      logs.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'usuario',
      });
    }
  }
  logs.init({
    nameTable: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN,
    valorAnterior: DataTypes.TEXT,
    valorActual: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'logs',
  });
  return logs;
};