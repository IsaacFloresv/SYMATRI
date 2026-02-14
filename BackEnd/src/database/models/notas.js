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

      // Relación con tipoNotas
      notas.belongsTo(models.tipoNotas, {
        foreignKey: 'tipoId',
        as: 'tipoNota',
      });

    }
  }
  notas.init({
    periodo: DataTypes.STRING,
    alumnoId: DataTypes.INTEGER,
    materiaId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    tipoId: DataTypes.INTEGER,
    nota: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'notas',
  });
  return notas;
};