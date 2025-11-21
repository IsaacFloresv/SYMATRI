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
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("seccionProfesors", null, {});
  },
};
