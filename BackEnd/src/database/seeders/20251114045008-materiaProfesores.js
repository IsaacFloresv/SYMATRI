'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('materiaProfesors', [
      { materiaId: 1, profesorId: 6, createdAt: new Date(), updatedAt: new Date() },
      { materiaId: 2, profesorId: 7, createdAt: new Date(), updatedAt: new Date() },
      { materiaId: 3, profesorId: 6, createdAt: new Date(), updatedAt: new Date() },
      { materiaId: 4, profesorId: 6, createdAt: new Date(), updatedAt: new Date() },
      { materiaId: 5, profesorId: 7, createdAt: new Date(), updatedAt: new Date() },
      { materiaId: 6, profesorId: 6, createdAt: new Date(), updatedAt: new Date() },
      { materiaId: 7, profesorId: 7, createdAt: new Date(), updatedAt: new Date() },
      { materiaId: 8, profesorId: 6, createdAt: new Date(), updatedAt: new Date() },
      { materiaId: 9, profesorId: 7, createdAt: new Date(), updatedAt: new Date() },
      { materiaId: 10, profesorId: 6, createdAt: new Date(), updatedAt: new Date() },
      { materiaId: 11, profesorId: 7, createdAt: new Date(), updatedAt: new Date() },
      { materiaId: 12, profesorId: 6, createdAt: new Date(), updatedAt: new Date() },
      { materiaId: 13, profesorId: 7, createdAt: new Date(), updatedAt: new Date() },
      { materiaId: 14, profesorId: 6, createdAt: new Date(), updatedAt: new Date() },
      { materiaId: 15, profesorId: 7, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('materiaProfesors', null, {});
  }
};