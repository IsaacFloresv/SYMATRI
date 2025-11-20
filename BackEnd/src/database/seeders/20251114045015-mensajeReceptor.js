'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('mensajeReceptors', [
      {
        mensajeId: 1,
        receptorId: 3,
        leido: false,
        fechaLectura: null
      },
      {
        mensajeId: 1,
        receptorId: 5,
        leido: false,
        fechaLectura: null
      },
      {
        mensajeId: 1,
        receptorId: 4,
        leido: false,
        fechaLectura: null
      },
      {
        mensajeId: 1,
        receptorId: 6,
        leido: false,
        fechaLectura: null
      },
      {
        mensajeId: 2,
        receptorId: 3,
        leido: false,
        fechaLectura: null
      },
      {
        mensajeId: 2,
        receptorId: 8,
        leido: false,
        fechaLectura: null
      },
      {
        mensajeId: 2,
        receptorId: 7,
        leido: false,
        fechaLectura: null
      },
      {
        mensajeId: 2,
        receptorId: 5,
        leido: false,
        fechaLectura: null
      },
      {
        mensajeId: 2,
        receptorId: 1,
        leido: false,
        fechaLectura: null
      },
      {
        mensajeId: 2,
        receptorId: 4,
        leido: false,
        fechaLectura: null
      },
      {
        mensajeId: 3,
        receptorId: 10,
        leido: false,
        fechaLectura: null
      },
      {
        mensajeId: 3,
        receptorId: 11,
        leido: false,
        fechaLectura: null
      },
      {
        mensajeId: 3,
        receptorId: 12,
        leido: false,
        fechaLectura: null
      },
      {
        mensajeId: 3,
        receptorId: 13,
        leido: false,
        fechaLectura: null
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mensajeReceptors', null, {});
  },
};