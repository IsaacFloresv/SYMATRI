'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('configs', [
      {
        clave: 'maxUsuarios',
        valor: '25',
        tipo: 'INTEGER',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clave: 'minUsuarios',
        valor: '10',
        tipo: 'INTEGER',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clave: 'notaMaxima',
        valor: '100',
        tipo: 'INTEGER',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clave: 'nombreInstitucion',
        valor: 'Colegio Santa Yasuri',
        tipo: 'STRING',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('configs', null, {});
  }
};