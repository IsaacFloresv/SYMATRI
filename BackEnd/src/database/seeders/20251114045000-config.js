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
      },
      { clave: 'timezone', valor: 'UTC-5', tipo: 'STRING', createdAt: new Date(), updatedAt: new Date() },
      { clave: 'schoolYearStart', valor: '2024-08-01', tipo: 'STRING', createdAt: new Date(), updatedAt: new Date() },
      { clave: 'signupOpen', valor: 'true', tipo: 'STRING', createdAt: new Date(), updatedAt: new Date() },
      { clave: 'maxClassSize', valor: '30', tipo: 'INTEGER', createdAt: new Date(), updatedAt: new Date() },
      { clave: 'minClassSize', valor: '10', tipo: 'INTEGER', createdAt: new Date(), updatedAt: new Date() },
      { clave: 'maxSubjectsPerStudent', valor: '8', tipo: 'INTEGER', createdAt: new Date(), updatedAt: new Date() },
      { clave: 'supportEmail', valor: 'soporte@example.com', tipo: 'STRING', createdAt: new Date(), updatedAt: new Date() },
      { clave: 'defaultLanguage', valor: 'es', tipo: 'STRING', createdAt: new Date(), updatedAt: new Date() },
      { clave: 'dateFormat', valor: 'DD/MM/YYYY', tipo: 'STRING', createdAt: new Date(), updatedAt: new Date() },
      { clave: 'gradingScale', valor: '100', tipo: 'INTEGER', createdAt: new Date(), updatedAt: new Date() },
      { clave: 'attendanceThreshold', valor: '75', tipo: 'INTEGER', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('configs', null, {});
  }
};