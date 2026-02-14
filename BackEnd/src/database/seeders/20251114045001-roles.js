'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        nombre: 'alumno',
        descripcion: 'alumno',
        modulos: JSON.stringify([41, 42, 43, 44]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'encargado',
        descripcion: 'encargado',
        modulos: JSON.stringify([31, 32, 33, 34]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'profesor',
        descripcion: 'profesor',
        modulos: JSON.stringify([21, 22, 23, 24, 25, 26]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'admin1',
        descripcion: 'administrador',
        modulos: JSON.stringify([11, 12, 13, 14, 15, 16, 17, 18, 19]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'admin007',
        descripcion: 'soporte',
        // soporte mantiene los módulos 1..10 (legacy)
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