"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "secciones",
      [
        {
          periodo: "2024",
          name: "7-1",
          profesorId: 1,
        },
        {
          periodo: "2024",
          name: "8-2",
          profesorId: 2,
        },
        {
          periodo: "2025",
          name: "8-2",
          profesorId: 2,
        },
        {
          periodo: "2025",
          name: "9-3",
          profesorId: 3,
        },
        { periodo: '2024', name: '7-2', profesorId: 6 },
        { periodo: '2024', name: '8-1', profesorId: 7 },
        { periodo: '2024', name: '9-1', profesorId: 6 },
        { periodo: '2024', name: '10-1', profesorId: 3 },
        { periodo: '2024', name: '11-2', profesorId: 6 },
        { periodo: '2024', name: '12-1', profesorId: 7 },
        { periodo: '2024', name: '6-1', profesorId: 3 },
        { periodo: '2025', name: '7-3', profesorId: 6 },
        { periodo: '2025', name: '8-3', profesorId: 7 },
        { periodo: '2025', name: '9-2', profesorId: 3 },
        { periodo: '2025', name: '10-2', profesorId: 6 }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("secciones", null, {});
  },
};
