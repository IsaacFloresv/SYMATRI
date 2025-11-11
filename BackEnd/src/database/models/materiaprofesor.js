'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class materiaProfesor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  materiaProfesor.init({
    materiaId: DataTypes.INTEGER,
    profesorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'materiaProfesor',
  });
  return materiaProfesor;
};