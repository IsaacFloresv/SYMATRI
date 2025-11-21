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
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("secciones", null, {});
  },
};
