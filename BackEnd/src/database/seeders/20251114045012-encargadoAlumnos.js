'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('encargadoAlumnos', [
      {
        alumnoId: 3,
        encargadoId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        alumnoId: 4,
        encargadoId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        alumnoId: 5,
        encargadoId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('encargadoAlumnos', null, {});
  }
};