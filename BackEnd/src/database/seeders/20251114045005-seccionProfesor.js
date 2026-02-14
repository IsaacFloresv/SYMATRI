"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "seccionProfesors",
      [
        {
          periodo: "2024",
          seccionId: "1",
          profesorId: "3",
        },
        {
          periodo: "2024",
          seccionId: "2",
          profesorId: "2",
        },
        {
          periodo: "2024",
          seccionId: "3",
          profesorId: "1",
        },        { periodo: '2024', seccionId: '4', profesorId: '6' },
        { periodo: '2024', seccionId: '5', profesorId: '6' },
        { periodo: '2024', seccionId: '6', profesorId: '7' },
        { periodo: '2024', seccionId: '7', profesorId: '6' },
        { periodo: '2024', seccionId: '8', profesorId: '3' },
        { periodo: '2024', seccionId: '9', profesorId: '6' },
        { periodo: '2024', seccionId: '10', profesorId: '7' },
        { periodo: '2024', seccionId: '11', profesorId: '3' },
        { periodo: '2025', seccionId: '12', profesorId: '6' },
        { periodo: '2025', seccionId: '13', profesorId: '7' },
        { periodo: '2025', seccionId: '14', profesorId: '3' },
        { periodo: '2025', seccionId: '15', profesorId: '6' }      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("seccionProfesors", null, {});
  },
};
