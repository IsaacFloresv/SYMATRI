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
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Lelo",
          lastName: "Rodríguez",
          address: "Calle sin salida #3",
          telefono: "78945612",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Joy",
          lastName: "Mora",
          address: "Calle sin salida #5",
          telefono: "78945612",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Admin",
          lastName: "Admin",
          address: "Calle sin salida #10",
          telefono: "78945612",
          userId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Admin2",
          lastName: "Admin",
          address: "Calle sin salida #11",
          telefono: "78945612",
          userId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Carlos",
          lastName: "Gómez",
          address: "Calle sin salida #12",
          telefono: "78945612",
          userId: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Ana",
          lastName: "Pérez",
          address: "Calle sin salida #13",
          telefono: "78945612",
          userId: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Mario",
          lastName: "Encargado",
          address: "Calle sin salida #14",
          telefono: "78945612",
          userId: 8,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Lucía",
          lastName: "Encargada",
          address: "Calle sin salida #15",
          telefono: "78945612",
          userId: 9,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Pedro",
          lastName: "Alumno",
          address: "Calle sin salida #16",
          telefono: "78945612",
          userId: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Sofía",
          lastName: "Alumno",
          address: "Calle sin salida #17",
          telefono: "78945612",
          userId: 11,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Andrés",
          lastName: "Alumno",
          address: "Calle sin salida #18",
          telefono: "78945612",
          userId: 12,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Valeria",
          lastName: "Alumno",
          address: "Calle sin salida #19",
          telefono: "78945612",
          userId: 13,
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
