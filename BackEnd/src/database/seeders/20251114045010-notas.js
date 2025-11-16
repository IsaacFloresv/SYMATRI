'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('notas', [
      {
        alumnoId: 10, // alumno1
        materiaId: 1, // Matemáticas
        usuarioId: 6, // profe1
        nota: 85.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        alumnoId: 11, // alumno2
        materiaId: 2, // Ciencias Naturales
        usuarioId: 7, // profe2
        nota: 92.0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        alumnoId: 12, // alumno3
        materiaId: 3, // Estudios Sociales
        usuarioId: 6, // profe1
        nota: 78.25,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notas', null, {});
  }
};