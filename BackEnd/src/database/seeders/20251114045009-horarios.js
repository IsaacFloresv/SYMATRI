'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('horarios', [
      // Horarios para cada seccion (2 registros por semana, lunes a viernes)
      { periodo: '2026', seccionId: 1, profesorId: 6, dia: 'Lunes', inicio: '08:00:00', final: '09:30:00' },
      { periodo: '2026', seccionId: 1, profesorId: 6, dia: 'Miércoles', inicio: '08:00:00', final: '09:30:00' },

      { periodo: '2026', seccionId: 2, profesorId: 7, dia: 'Martes', inicio: '10:00:00', final: '11:30:00' },
      { periodo: '2026', seccionId: 2, profesorId: 7, dia: 'Jueves', inicio: '10:00:00', final: '11:30:00' },

      { periodo: '2026', seccionId: 3, profesorId: 3, dia: 'Lunes', inicio: '08:00:00', final: '09:30:00' },
      { periodo: '2026', seccionId: 3, profesorId: 3, dia: 'Viernes', inicio: '08:00:00', final: '09:30:00' },

      { periodo: '2026', seccionId: 4, profesorId: 6, dia: 'Martes', inicio: '09:00:00', final: '10:30:00' },
      { periodo: '2026', seccionId: 4, profesorId: 6, dia: 'Jueves', inicio: '09:00:00', final: '10:30:00' },

      { periodo: '2026', seccionId: 5, profesorId: 7, dia: 'Miércoles', inicio: '11:00:00', final: '12:30:00' },
      { periodo: '2026', seccionId: 5, profesorId: 7, dia: 'Viernes', inicio: '11:00:00', final: '12:30:00' },

      { periodo: '2026', seccionId: 6, profesorId: 6, dia: 'Lunes', inicio: '13:00:00', final: '14:30:00' },
      { periodo: '2026', seccionId: 6, profesorId: 6, dia: 'Miércoles', inicio: '13:00:00', final: '14:30:00' },

      { periodo: '2026', seccionId: 7, profesorId: 7, dia: 'Martes', inicio: '07:30:00', final: '09:00:00' },
      { periodo: '2026', seccionId: 7, profesorId: 7, dia: 'Jueves', inicio: '07:30:00', final: '09:00:00' },

      { periodo: '2026', seccionId: 8, profesorId: 3, dia: 'Lunes', inicio: '10:00:00', final: '11:30:00' },
      { periodo: '2026', seccionId: 8, profesorId: 3, dia: 'Viernes', inicio: '10:00:00', final: '11:30:00' },

      { periodo: '2026', seccionId: 9, profesorId: 6, dia: 'Martes', inicio: '08:00:00', final: '09:30:00' },
      { periodo: '2026', seccionId: 9, profesorId: 6, dia: 'Jueves', inicio: '08:00:00', final: '09:30:00' },

      { periodo: '2026', seccionId: 10, profesorId: 7, dia: 'Miércoles', inicio: '09:00:00', final: '10:30:00' },
      { periodo: '2026', seccionId: 10, profesorId: 7, dia: 'Viernes', inicio: '09:00:00', final: '10:30:00' },

      { periodo: '2026', seccionId: 11, profesorId: 3, dia: 'Lunes', inicio: '10:00:00', final: '11:30:00' },
      { periodo: '2026', seccionId: 11, profesorId: 3, dia: 'Miércoles', inicio: '10:00:00', final: '11:30:00' },

      { periodo: '2026', seccionId: 12, profesorId: 6, dia: 'Martes', inicio: '12:00:00', final: '13:30:00' },
      { periodo: '2026', seccionId: 12, profesorId: 6, dia: 'Jueves', inicio: '12:00:00', final: '13:30:00' },

      { periodo: '2026', seccionId: 13, profesorId: 7, dia: 'Lunes', inicio: '14:00:00', final: '15:30:00' },
      { periodo: '2026', seccionId: 13, profesorId: 7, dia: 'Viernes', inicio: '14:00:00', final: '15:30:00' },

      { periodo: '2026', seccionId: 14, profesorId: 3, dia: 'Martes', inicio: '08:30:00', final: '10:00:00' },
      { periodo: '2026', seccionId: 14, profesorId: 3, dia: 'Jueves', inicio: '08:30:00', final: '10:00:00' },

      { periodo: '2026', seccionId: 15, profesorId: 6, dia: 'Miércoles', inicio: '15:00:00', final: '16:30:00' },
      { periodo: '2026', seccionId: 15, profesorId: 6, dia: 'Viernes', inicio: '15:00:00', final: '16:30:00' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('horarios', null, {});
  }
};