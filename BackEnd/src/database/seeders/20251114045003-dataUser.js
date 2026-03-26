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
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Soporte",
          telefono: "78945612",
          userId: 1
        },
        {
          firstName: "Lelo",
          lastName: "Rodríguez",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle sin salida #3",
          telefono: "78945612",
          userId: 2
        },
        {
          firstName: "Joy",
          lastName: "Mora",
          birthDate: "2008-10-10",
          genero: "femenino",
          address: "Calle sin salida #5",
          telefono: "78945612",
          userId: 3
        },
        {
          firstName: "Admin",
          lastName: "Admin",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle sin salida #10",
          telefono: "78945612",
          userId: 4
        },
        {
          firstName: "Admin2",
          lastName: "Admin2",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle sin salida #11",
          telefono: "78945612",
          userId: 5
        },
        {
          firstName: "Carlos",
          lastName: "Gómez",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle sin salida #12",
          telefono: "78945612",
          userId: 6
        },
        {
          firstName: "Ana",
          lastName: "Pérez",
          birthDate: "2008-10-10",
          genero: "femenino",
          address: "Calle sin salida #13",
          telefono: "78945612",
          userId: 7
        },
        {
          firstName: "Mario",
          lastName: "Encargado",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle sin salida #14",
          telefono: "78945612",
          userId: 8
        },
        {
          firstName: "Lucía",
          lastName: "Encargada",
          birthDate: "2008-10-10",
          genero: "femenino",
          address: "Calle sin salida #15",
          telefono: "78945612",
          userId: 9
        },
        {
          firstName: "Pedro",
          lastName: "Alumno",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle sin salida #16",
          telefono: "78945612",
          userId: 10
        },
        {
          firstName: "Sofía",
          lastName: "Alumno",
          birthDate: "2008-10-10",
          genero: "femenino",
          address: "Calle sin salida #17",
          telefono: "78945612",
          userId: 11
        },
        {
          firstName: "Andrés",
          lastName: "Alumno",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle sin salida #18",
          telefono: "78945612",
          userId: 12
        },
        {
          firstName: "Valeria",
          lastName: "Alumno",
          birthDate: "2008-10-10",
          genero: "femenino",
          address: "Calle sin salida #19",
          telefono: "78945612",
          userId: 13
        },
        {
          firstName: "Isaac",
          lastName: "Flores",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle sin salida #2",
          telefono: "78945612",
          userId: 14
        },
        {
          firstName: "Abigail",
          lastName: "Rodríguez",
          birthDate: "2008-10-10",
          genero: "femenino",
          address: "Av. Central #22",
          telefono: "78945699",
          userId: 15
        },
        {
          firstName: "Alumno16",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle Ejemplo #116",
          telefono: "78945116",
          userId: 16
        },
        {
          firstName: "Alumno17",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "femenino",
          address: "Calle Ejemplo #117",
          telefono: "78945117",
          userId: 17
        },
        {
          firstName: "Alumno18",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle Ejemplo #118",
          telefono: "78945118",
          userId: 18
        },
        {
          firstName: "Alumno19",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "femenino",
          address: "Calle Ejemplo #119",
          telefono: "78945119",
          userId: 19
        },
        {
          firstName: "Alumno20",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle Ejemplo #120",
          telefono: "78945120",
          userId: 20
        },
        {
          firstName: "Alumno21",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "femenino",
          address: "Calle Ejemplo #121",
          telefono: "78945121",
          userId: 21
        },
        {
          firstName: "Alumno22",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle Ejemplo #122",
          telefono: "78945122",
          userId: 22
        },
        {
          firstName: "Alumno23",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "femenino",
          address: "Calle Ejemplo #123",
          telefono: "78945123",
          userId: 23
        },
        {
          firstName: "Alumno24",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle Ejemplo #124",
          telefono: "78945124",
          userId: 24
        },
        {
          firstName: "Alumno25",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "femenino",
          address: "Calle Ejemplo #125",
          telefono: "78945125",
          userId: 25
        },
        {
          firstName: "Alumno26",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle Ejemplo #126",
          telefono: "78945126",
          userId: 26
        },
        {
          firstName: "Alumno27",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "femenino",
          address: "Calle Ejemplo #127",
          telefono: "78945127",
          userId: 27
        },
        {
          firstName: "Alumno28",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle Ejemplo #128",
          telefono: "78945128",
          userId: 28
        },
        {
          firstName: "Alumno29",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "femenino",
          address: "Calle Ejemplo #129",
          telefono: "78945129",
          userId: 29
        },
        {
          firstName: "Alumno30",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle Ejemplo #130",
          telefono: "78945130",
          userId: 30
        },
        {
          firstName: "Alumno31",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "femenino",
          address: "Calle Ejemplo #131",
          telefono: "78945131",
          userId: 31
        },
        {
          firstName: "Alumno32",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle Ejemplo #132",
          telefono: "78945132",
          userId: 32
        },
        {
          firstName: "Alumno33",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "femenino",
          address: "Calle Ejemplo #133",
          telefono: "78945133",
          userId: 33
        },
        {
          firstName: "Alumno34",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle Ejemplo #134",
          telefono: "78945134",
          userId: 34
        },
        {
          firstName: "Alumno35",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "femenino",
          address: "Calle Ejemplo #135",
          telefono: "78945135",
          userId: 35
        },
        {
          firstName: "Alumno36",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle Ejemplo #136",
          telefono: "78945136",
          userId: 36
        },
        {
          firstName: "Alumno37",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "femenino",
          address: "Calle Ejemplo #137",
          telefono: "78945137",
          userId: 37
        },
        {
          firstName: "Alumno38",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle Ejemplo #138",
          telefono: "78945138",
          userId: 38
        },
        {
          firstName: "Alumno39",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "femenino",
          address: "Calle Ejemplo #139",
          telefono: "78945139",
          userId: 39
        },
        {
          firstName: "Alumno40",
          lastName: "Ejemplo",
          birthDate: "2008-10-10",
          genero: "masculino",
          address: "Calle Ejemplo #140",
          telefono: "78945140",
          userId: 40
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("dataUsers", null, {});
  },
};
