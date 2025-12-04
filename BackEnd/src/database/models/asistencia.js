'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class asistencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación: cada actividad pertenece a un actividades
      asistencia.belongsTo(models.actividades, {
        foreignKey: 'actividadId',
        as: 'actividad',
      });
      
      // Relación: cada actividad pertenece a un usuario
      asistencia.belongsTo(models.user, {
        foreignKey: 'alumnoId',
        as: 'alumnoAsistente',
      });
      
      // Relación: cada actividad pertenece a un usuario
      asistencia.belongsTo(models.user, {
        foreignKey: 'profesorId',
        as: 'registrador',
      });
    }
  }
  asistencia.init({
    actividadId: DataTypes.INTEGER,
    alumnoId: DataTypes.INTEGER,
    profesorId: DataTypes.INTEGER,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'asistencia',
  });
  return asistencia;
};