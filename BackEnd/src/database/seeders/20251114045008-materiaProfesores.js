'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('materiaProfesors', [
      {
        materiaId: 1,
        profesorId: 6, // profe1
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        materiaId: 2,
        profesorId: 7, // profe2
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        materiaId: 3,
        profesorId: 6, // profe1
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('materiaProfesors', null, {});
  }
};