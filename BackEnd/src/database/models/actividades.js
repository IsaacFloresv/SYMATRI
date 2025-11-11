'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class actividades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  actividades.init({
    name: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    fechaInicio: DataTypes.DATE,
    fechaFinal: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'actividades',
  });
  return actividades;
};