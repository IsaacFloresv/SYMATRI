"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          nombre: "Alumno",
          modulos: '1,2,3, 4',
        },
        {
          nombre: "Encargado",
          modulos: '1,2,3,4,5',
        },
        {
          nombre: "Admin2",
          modulos: '1,2,3,4,5,6',
        },
        {
          nombre: "Admin1",
          modulos: '1,2,3,4,5,6,7,8',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
     await queryInterface.bulkDelete('roles', null, {});
  },
};
