'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mensajeReceptor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  mensajeReceptor.init({
    mensajeId: DataTypes.INTEGER,
    receptorId: DataTypes.INTEGER,
    leido: DataTypes.BOOLEAN,
    fechaLectura: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'mensajeReceptor',
  });
  return mensajeReceptor;
};