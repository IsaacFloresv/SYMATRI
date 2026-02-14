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
        { periodo: '2024', seccionId: '3', alumnoId: 5 },
        { periodo: '2024', seccionId: '3', alumnoId: 6 },
        { periodo: '2024', seccionId: '4', alumnoId: 7 },
        { periodo: '2024', seccionId: '4', alumnoId: 8 },
        { periodo: '2024', seccionId: '5', alumnoId: 9 },
        { periodo: '2024', seccionId: '5', alumnoId: 10 },
        { periodo: '2024', seccionId: '6', alumnoId: 11 },
        { periodo: '2024', seccionId: '6', alumnoId: 12 },
        { periodo: '2024', seccionId: '7', alumnoId: 13 },
        { periodo: '2024', seccionId: '8', alumnoId: 14 },
        { periodo: '2024', seccionId: '9', alumnoId: 15 }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("seccionAlumnos", null, {});
  },
};
