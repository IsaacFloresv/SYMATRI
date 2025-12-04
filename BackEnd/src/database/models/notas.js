'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notas extends Model {
    static associate(models) {
      // Relación con el alumno
      notas.belongsTo(models.user, {
        foreignKey: 'alumnoId',
        as: 'alumnoNota',
      });

      // Relación con el usuario que asigna la nota
      notas.belongsTo(models.user, {
        foreignKey: 'usuarioId',
        as: 'autor',
      });

      // Relación con la materia
      notas.belongsTo(models.materias, {
        foreignKey: 'materiaId',
        as: 'materia',
      });

    }
  }
  notas.init({
    periodo: DataTypes.STRING,
    alumnoId: DataTypes.INTEGER,
    materiaId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
    nota: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'notas',
  });
  return notas;
};