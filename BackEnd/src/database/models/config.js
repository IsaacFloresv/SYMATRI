'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  config.init({
    clave: DataTypes.STRING,
    valor: DataTypes.TEXT,
    tipo: { 
        type: DataTypes.ENUM("INTEGER", "STRING", "BOOLEAN"), 
        allowNull: false, 
        defaultValue: "STRING"
    }
  }, {
    sequelize,
    modelName: 'config',
  });
  return config;
};