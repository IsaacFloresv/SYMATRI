'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('errores', [
      { logErrors: "TypeError: Cannot read property 'foo' of undefined\n    at Object.<anonymous> (/src/controllers/test.js:10:15)", estado: "critico" },
      { logErrors: "SequelizeDatabaseError: Unknown column 'bar' in 'field list'\n    at Query.run (/node_modules/sequelize/lib/dialects/mysql/query.js:52:25)", estado: "error" },
      { logErrors: "ReferenceError: x is not defined\n    at Object.<anonymous> (/src/services/util.js:22:11)", estado: "warning" },
      { logErrors: "UnhandledPromiseRejectionWarning: ValidationError: Email is required\n    at User.create (/src/models/user.js:45:13)", estado: "error" },
      { logErrors: "TypeError: Cannot read property 'bar' of null\n    at /src/controllers/foo.js:15:10", estado: "critico" },
      { logErrors: "Error: Connection timed out\n    at Network.request (/src/services/http.js:45:20)", estado: "error" },
      { logErrors: "SyntaxError: Unexpected token < in JSON\n    at JSON.parse (<anonymous>)", estado: "warning" },
      { logErrors: "SequelizeUniqueConstraintError: duplicate key value violates unique constraint", estado: "error" },
      { logErrors: "ReferenceError: process is not defined\n    at Object.<anonymous> (/src/index.js:5:3)", estado: "critico" },
      { logErrors: "TypeError: Cannot set properties of undefined\n    at Class.method (/src/services/cache.js:30:12)", estado: "error" },
      { logErrors: "Error: ENOENT: no such file or directory, open '/tmp/data.csv'", estado: "warning" },
      { logErrors: "RangeError: Maximum call stack size exceeded\n    at recursive (/src/utils/rec.js:10:5)", estado: "critico" },
      { logErrors: "Warning: Deprecated API used\n    at Module.load (/node:internal/modules:loader:928:11)", estado: "warning" },
      { logErrors: "UnhandledPromiseRejectionWarning: Error: Invalid token\n    at auth.verify (/src/middleware/auth.js:40:15)", estado: "error" }
], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('errores', null, {});
  }
};
