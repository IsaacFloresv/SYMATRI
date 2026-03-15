'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('asistencia', [
      // Seccion 1 (Profesor 1) - Materias 1 y 2
      { actividadId: 1, alumnoId: 1, profesorId: 1, estado: 'presente' },
      { actividadId: 1, alumnoId: 2, profesorId: 1, estado: 'tardia' },
      { actividadId: 1, alumnoId: 3, profesorId: 1, estado: 'ausente' },
      { actividadId: 2, alumnoId: 1, profesorId: 1, estado: 'presente' },
      { actividadId: 2, alumnoId: 2, profesorId: 1, estado: 'presente' },
      { actividadId: 2, alumnoId: 3, profesorId: 1, estado: 'tardia' },
      // Pedro Alumno (alumnoId 10) asistencia en materias 1-15 (una actividad por materia)
      { actividadId: 1, alumnoId: 10, profesorId: 6, estado: 'presente' },
      { actividadId: 2, alumnoId: 10, profesorId: 6, estado: 'presente' },
      { actividadId: 3, alumnoId: 10, profesorId: 7, estado: 'presente' },
      { actividadId: 4, alumnoId: 10, profesorId: 7, estado: 'presente' },
      { actividadId: 5, alumnoId: 10, profesorId: 6, estado: 'presente' },
      { actividadId: 6, alumnoId: 10, profesorId: 6, estado: 'presente' },
      { actividadId: 7, alumnoId: 10, profesorId: 6, estado: 'presente' },
      { actividadId: 8, alumnoId: 10, profesorId: 6, estado: 'presente' },
      { actividadId: 9, alumnoId: 10, profesorId: 7, estado: 'presente' },
      { actividadId: 10, alumnoId: 10, profesorId: 7, estado: 'presente' },
      { actividadId: 11, alumnoId: 10, profesorId: 6, estado: 'presente' },
      { actividadId: 12, alumnoId: 10, profesorId: 6, estado: 'presente' },
      { actividadId: 13, alumnoId: 10, profesorId: 7, estado: 'presente' },
      { actividadId: 14, alumnoId: 10, profesorId: 7, estado: 'presente' },
      { actividadId: 15, alumnoId: 10, profesorId: 7, estado: 'presente' },
      { actividadId: 16, alumnoId: 10, profesorId: 6, estado: 'presente' },
      { actividadId: 17, alumnoId: 10, profesorId: 6, estado: 'presente' },
      { actividadId: 18, alumnoId: 10, profesorId: 6, estado: 'presente' },
      { actividadId: 19, alumnoId: 10, profesorId: 7, estado: 'presente' },
      { actividadId: 20, alumnoId: 10, profesorId: 7, estado: 'presente' },
      { actividadId: 21, alumnoId: 10, profesorId: 7, estado: 'presente' },
      { actividadId: 22, alumnoId: 10, profesorId: 6, estado: 'presente' },
      { actividadId: 23, alumnoId: 10, profesorId: 6, estado: 'presente' },
      { actividadId: 24, alumnoId: 10, profesorId: 6, estado: 'presente' },
      { actividadId: 25, alumnoId: 10, profesorId: 6, estado: 'presente' },
      { actividadId: 26, alumnoId: 10, profesorId: 7, estado: 'presente' },
      { actividadId: 27, alumnoId: 10, profesorId: 7, estado: 'presente' },
      { actividadId: 28, alumnoId: 10, profesorId: 6, estado: 'presente' },
      { actividadId: 29, alumnoId: 10, profesorId: 7, estado: 'presente' },
      { actividadId: 30, alumnoId: 10, profesorId: 7, estado: 'presente' },

      // Seccion 2 (Profesor 2) - Materias 3 y 4
      { actividadId: 3, alumnoId: 4, profesorId: 2, estado: 'presente' },
      { actividadId: 3, alumnoId: 5, profesorId: 2, estado: 'ausente' },
      { actividadId: 3, alumnoId: 6, profesorId: 2, estado: 'presente' },
      { actividadId: 4, alumnoId: 4, profesorId: 2, estado: 'tardia' },
      { actividadId: 4, alumnoId: 5, profesorId: 2, estado: 'presente' },
      { actividadId: 4, alumnoId: 6, profesorId: 2, estado: 'presente' },

      // Seccion 3 (Profesor 3) - Materias 5 y 6
      { actividadId: 5, alumnoId: 7, profesorId: 3, estado: 'presente' },
      { actividadId: 5, alumnoId: 8, profesorId: 3, estado: 'tardia' },
      { actividadId: 5, alumnoId: 9, profesorId: 3, estado: 'presente' },
      { actividadId: 6, alumnoId: 7, profesorId: 3, estado: 'ausente' },
      { actividadId: 6, alumnoId: 8, profesorId: 3, estado: 'presente' },
      { actividadId: 6, alumnoId: 9, profesorId: 3, estado: 'presente' },

      // Seccion 4 (Profesor 6) - Materias 7 y 8
      { actividadId: 7, alumnoId: 10, profesorId: 6, estado: 'presente' },
      { actividadId: 7, alumnoId: 11, profesorId: 6, estado: 'tardia' },
      { actividadId: 7, alumnoId: 12, profesorId: 6, estado: 'ausente' },
      { actividadId: 8, alumnoId: 10, profesorId: 6, estado: 'presente' },
      { actividadId: 8, alumnoId: 11, profesorId: 6, estado: 'presente' },
      { actividadId: 8, alumnoId: 12, profesorId: 6, estado: 'tardia' },

      // Seccion 5 (Profesor 7) - Materias 9 y 10
      { actividadId: 9, alumnoId: 13, profesorId: 7, estado: 'presente' },
      { actividadId: 9, alumnoId: 14, profesorId: 7, estado: 'ausente' },
      { actividadId: 9, alumnoId: 15, profesorId: 7, estado: 'presente' },
      { actividadId: 10, alumnoId: 13, profesorId: 7, estado: 'tardia' },
      { actividadId: 10, alumnoId: 14, profesorId: 7, estado: 'presente' },
      { actividadId: 10, alumnoId: 15, profesorId: 7, estado: 'presente' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('asistencia', null, {});
  }
};
