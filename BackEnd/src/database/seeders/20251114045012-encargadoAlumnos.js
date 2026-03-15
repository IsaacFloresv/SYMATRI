'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('encargadoAlumnos', [
      // Cada encargado tiene máximo 3 alumnos
      // Encargado 1 (userId 8) -> alumno1..alumno3
      { alumnoId: 10, encargadoId: 8, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 11, encargadoId: 8, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 12, encargadoId: 8, createdAt: new Date(), updatedAt: new Date() },

      // Encargado 2 (userId 9) -> alumno4..alumno6
      { alumnoId: 13, encargadoId: 9, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 14, encargadoId: 9, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 15, encargadoId: 9, createdAt: new Date(), updatedAt: new Date() },

      // Encargado 3 (userId 16) -> alumno16..alumno18
      { alumnoId: 17, encargadoId: 16, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 18, encargadoId: 16, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 19, encargadoId: 16, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('encargadoAlumnos', null, {});
  }
};