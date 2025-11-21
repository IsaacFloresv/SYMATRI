"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "seccionAlumnos",
      [
        {
          periodo: "2024",
          seccionId: "1",
          alumnoId: 1,
        },
        {
          periodo: "2024",
          seccionId: "1",
          alumnoId: 2,
        },
        {
          periodo: "2024",
          seccionId: "2",
          alumnoId: 3,
        },
        {
          periodo: "2024",
          seccionId: "2",
          alumnoId: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("seccionAlumnos", null, {});
  },
};
