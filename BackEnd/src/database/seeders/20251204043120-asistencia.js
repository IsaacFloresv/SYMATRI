'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('asistencia', [
      {
        "actividadId": 1,
        "alumnoId": 10,
        "profesorId": 6,
        "estado": "presente"
      },
      {
        "actividadId": 1,
        "alumnoId": 11,
        "profesorId": 6,
        "estado": "tardia"
      },
      {
        "actividadId": 1,
        "alumnoId": 12,
        "profesorId": 6,
        "estado": "ausente"
      },
      {
        "actividadId": 2,
        "alumnoId": 13,
        "profesorId": 7,
        "estado": "presente"
      },
      {
        "actividadId": 2,
        "alumnoId": 14,
        "profesorId": 7,
        "estado": "presente"
      },
      {
        "actividadId": 2,
        "alumnoId": 15,
        "profesorId": 7,
        "estado": "tardia"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('asistencia', null, {});
  }
};
