'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('logs', [
      {
        nameTable: 'usuarios',
        userId: 1,
        estado: true,
        valorAnterior: 'null',
        valorActual: '{"nombre":"Isaac"}',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nameTable: 'productos',
        userId: 2,
        estado: false,
        valorAnterior: '{"precio":100}',
        valorActual: '{"precio":80}',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('logs', null, {});
  }
};
