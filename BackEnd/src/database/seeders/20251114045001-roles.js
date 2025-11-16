'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        nombre: 'Alumno',
        modulos: JSON.stringify([1, 2, 3, 4]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Encargado',
        modulos: JSON.stringify([1, 2, 3, 4, 5]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Admin2',
        modulos: JSON.stringify([1, 2, 3, 4, 5, 6]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Admin1',
        modulos: JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8]),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};