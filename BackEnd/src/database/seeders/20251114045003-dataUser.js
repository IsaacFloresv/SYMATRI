"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "dataUsers",
      [
        {
          firstName: "Soporte",
          lastName: "Soporte",
          address: "Soporte",
          telefono: "78945612",
          userId: 1
        },
        {
          firstName: "Lelo",
          lastName: "Rodríguez",
          address: "Calle sin salida #3",
          telefono: "78945612",
          userId: 2
        },
        {
          firstName: "Joy",
          lastName: "Mora",
          address: "Calle sin salida #5",
          telefono: "78945612",
          userId: 3
        },
        {
          firstName: "Admin",
          lastName: "Admin",
          address: "Calle sin salida #10",
          telefono: "78945612",
          userId: 4
        },
        {
          firstName: "Admin2",
          lastName: "Admin",
          address: "Calle sin salida #11",
          telefono: "78945612",
          userId: 5
        },
        {
          firstName: "Carlos",
          lastName: "Gómez",
          address: "Calle sin salida #12",
          telefono: "78945612",
          userId: 6
        },
        {
          firstName: "Ana",
          lastName: "Pérez",
          address: "Calle sin salida #13",
          telefono: "78945612",
          userId: 7
        },
        {
          firstName: "Mario",
          lastName: "Encargado",
          address: "Calle sin salida #14",
          telefono: "78945612",
          userId: 8
        },
        {
          firstName: "Lucía",
          lastName: "Encargada",
          address: "Calle sin salida #15",
          telefono: "78945612",
          userId: 9
        },
        {
          firstName: "Pedro",
          lastName: "Alumno",
          address: "Calle sin salida #16",
          telefono: "78945612",
          userId: 10
        },
        {
          firstName: "Sofía",
          lastName: "Alumno",
          address: "Calle sin salida #17",
          telefono: "78945612",
          userId: 11
        },
        {
          firstName: "Andrés",
          lastName: "Alumno",
          address: "Calle sin salida #18",
          telefono: "78945612",
          userId: 12
        },
        {
          firstName: "Valeria",
          lastName: "Alumno",
          address: "Calle sin salida #19",
          telefono: "78945612",
          userId: 13
        },
        {
          firstName: "Isaac",
          lastName: "Flores",
          address: "Calle sin salida #2",
          telefono: "78945612",
          userId: 14,
          createdAt: new Date(),
          updatedAt: new Date()
        }

      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("dataUsers", null, {});
  },
};
