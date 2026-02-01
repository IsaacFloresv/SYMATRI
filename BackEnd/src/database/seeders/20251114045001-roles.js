'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        nombre: 'alumno',
        modulos: JSON.stringify([1, 2, 3, 4]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'encargado',
        modulos: JSON.stringify([1, 2, 3, 4, 5]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'profesor',
        modulos: JSON.stringify([1, 2, 3, 4, 5, 6]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'admin1',
        modulos: JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'admin007',
        modulos: JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};