'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('notas', [
      {
        periodo: "2024",
        alumnoId: 10, // alumno1
        materiaId: 1, // Matemáticas
        usuarioId: 6, // profe1
        tipo: "T1-Tarea1",
        nota: "85.5",
      },
      {
        periodo: "2024",
        alumnoId: 10, // alumno1
        materiaId: 1, // Matemáticas
        usuarioId: 6, // profe1
        tipo: "T1-Tarea2",
        nota: "86.5",
      },
      {
        periodo: "2024",
        alumnoId: 10, // alumno2
        materiaId: 2, // Ciencias Naturales
        usuarioId: 7, // profe2
        tipo: "T1-Exa2",
        nota: "92.0",
      },
      {
        periodo: "2024",
        alumnoId: 10, // alumno3
        materiaId: 3, // Estudios Sociales
        usuarioId: 6, // profe1
        tipo: "T1-Exa1",
        nota: "78.25",
      },
      {
        periodo: "2024",
        alumnoId: 11, // alumno1
        materiaId: 1, // Matemáticas
        usuarioId: 6, // profe1
        tipo: "T1-Tarea1",
        nota: "85.5",
      },
      {
        periodo: "2024",
        alumnoId: 11, // alumno1
        materiaId: 1, // Matemáticas
        usuarioId: 6, // profe1
        tipo: "T1-Tarea2",
        nota: "86.5",
      },
      {
        periodo: "2024",
        alumnoId: 11, // alumno2
        materiaId: 2, // Ciencias Naturales
        usuarioId: 7, // profe2
        tipo: "T1-Exa2",
        nota: "92.0",
      },
      {
        periodo: "2024",
        alumnoId: 11, // alumno3
        materiaId: 3, // Estudios Sociales
        usuarioId: 6, // profe1
        tipo: "T1-Exa1",
        nota: "78.25",
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notas', null, {});
  }
};