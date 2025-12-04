'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('errores', [{
        logErrors: "TypeError: Cannot read property 'foo' of undefined\n    at Object.<anonymous> (/src/controllers/test.js:10:15)",
        estado: "critico"
      },
      {
        logErrors: "SequelizeDatabaseError: Unknown column 'bar' in 'field list'\n    at Query.run (/node_modules/sequelize/lib/dialects/mysql/query.js:52:25)",
        estado: "error"
      },
      {
        logErrors: "ReferenceError: x is not defined\n    at Object.<anonymous> (/src/services/util.js:22:11)",
        estado: "warning"
      },
      {
        logErrors: "UnhandledPromiseRejectionWarning: ValidationError: Email is required\n    at User.create (/src/models/user.js:45:13)",
        estado: "error"
      }
], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('errores', null, {});
  }
};
