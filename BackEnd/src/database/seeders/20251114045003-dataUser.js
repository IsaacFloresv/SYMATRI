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
          genero: "masculino",
          address: "Soporte",
          telefono: "78945612",
          userId: 1
        },
        {
          firstName: "Lelo",
          lastName: "Rodríguez",
          genero: "masculino",
          address: "Calle sin salida #3",
          telefono: "78945612",
          userId: 2
        },
        {
          firstName: "Joy",
          lastName: "Mora",
          genero: "femenino",
          address: "Calle sin salida #5",
          telefono: "78945612",
          userId: 3
        },
        {
          firstName: "Admin",
          lastName: "Admin",
          genero: "masculino",
          address: "Calle sin salida #10",
          telefono: "78945612",
          userId: 4
        },
        {
          firstName: "Admin2",
          lastName: "Admin",
          genero: "masculino",
          address: "Calle sin salida #11",
          telefono: "78945612",
          userId: 5
        },
        {
          firstName: "Carlos",
          lastName: "Gómez",
          genero: "masculino",
          address: "Calle sin salida #12",
          telefono: "78945612",
          userId: 6
        },
        {
          firstName: "Ana",
          lastName: "Pérez",
          genero: "femenino",
          address: "Calle sin salida #13",
          telefono: "78945612",
          userId: 7
        },
        {
          firstName: "Mario",
          lastName: "Encargado",
          genero: "masculino",
          address: "Calle sin salida #14",
          telefono: "78945612",
          userId: 8
        },
        {
          firstName: "Lucía",
          lastName: "Encargada",
          genero: "femenino",
          address: "Calle sin salida #15",
          telefono: "78945612",
          userId: 9
        },
        {
          firstName: "Pedro",
          lastName: "Alumno",
          genero: "masculino",
          address: "Calle sin salida #16",
          telefono: "78945612",
          userId: 10
        },
        {
          firstName: "Sofía",
          lastName: "Alumno",
          genero: "femenino",
          address: "Calle sin salida #17",
          telefono: "78945612",
          userId: 11
        },
        {
          firstName: "Andrés",
          lastName: "Alumno",
          genero: "masculino",
          address: "Calle sin salida #18",
          telefono: "78945612",
          userId: 12
        },
        {
          firstName: "Valeria",
          lastName: "Alumno",
          genero: "femenino",
          address: "Calle sin salida #19",
          telefono: "78945612",
          userId: 13
        },
        {
          firstName: "Isaac",
          lastName: "Flores",
          genero: "masculino",
          address: "Calle sin salida #2",
          telefono: "78945612",
          userId: 14
        },
        {
          firstName: "Abigail",
          lastName: "Rodríguez",
          genero: "femenino",
          address: "Av. Central #22",
          telefono: "78945699",
          userId: 15
        }

      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("dataUsers", null, {});
  },
};
