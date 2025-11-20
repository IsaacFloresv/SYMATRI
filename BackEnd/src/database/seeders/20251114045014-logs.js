'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('logs', [
      {
        nameTable: 'Notas',
        userId: 1,
        estado: true,
        valorAnterior: '{"Materia":"Ciencias","Nota":"45"}',
        valorActual: '{"Materia":"Ciencias","Nota":"75"}'
      },
      {
        nameTable: 'Notas',
        userId: 2,
        estado: false,
        valorAnterior: '{"Materia":"Ciencias","Nota":"45"}',
        valorActual: '{"Materia":"Fisica","Nota":"85"}'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('logs', null, {});
  }
};
