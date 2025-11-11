"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "dataUsers",
      [
        {
          firstName: "Isaac",
          lastName: "Flores",
          address: "Calle sin salida #2",
          telefono: "78945612",
          userId: 1,
        },
        {
          firstName: "Vane",
          lastName: "Rodri",
          address: "Calle sin salida #3",
          telefono: "78945612",
          userId: 2,
        },
        {
          firstName: "Joy",
          lastName: "Mora",
          address: "Calle sin salida #5",
          telefono: "78945612",
          userId: 3,
        },{
        firstName: 'Admin',
        lastName: 'Admin',
        address: 'Calle sin salida #10',
        telefono: '78945612',
        userId: 4,
      }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("dataUsers", null, {});
  },
};
