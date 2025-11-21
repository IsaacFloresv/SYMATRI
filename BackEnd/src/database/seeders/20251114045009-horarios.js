'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('horarios', [
      {
        periodo: "2024",
        seccionId: 1,
        profesorId: 6, // profe1
        dia: 'Lunes',
        inicio: '08:00:00',
        final: '09:30:00'
      },
      {
        periodo: "2024",
        seccionId: 2,
        profesorId: 7, // profe2
        dia: 'Martes',
        inicio: '10:00:00',
        final: '11:30:00',
        periodo: "2024",
      },
      {
        periodo: "2024",
        seccionId: 3,
        profesorId: 3, // profe3
        dia: 'Miércoles',
        inicio: '08:00:00',
        final: '09:30:00'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('horarios', null, {});
  }
};