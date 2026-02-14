'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('encargadoAlumnos', [
      { alumnoId: 3, encargadoId: 1, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 4, encargadoId: 2, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 5, encargadoId: 1, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 6, encargadoId: 2, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 7, encargadoId: 1, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 8, encargadoId: 2, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 9, encargadoId: 1, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 10, encargadoId: 2, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 11, encargadoId: 1, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 12, encargadoId: 2, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 13, encargadoId: 1, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 14, encargadoId: 2, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 15, encargadoId: 1, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 16, encargadoId: 2, createdAt: new Date(), updatedAt: new Date() },
      { alumnoId: 17, encargadoId: 1, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('encargadoAlumnos', null, {});
  }
};