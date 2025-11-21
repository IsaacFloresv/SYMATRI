'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('mensajes', [
      {
        periodo: "2024",
        asunto: 'Reunión de padres',
        mensaje: 'Hola, te escribo para confirmar la reunión del viernes a las 10am.',
        emisorId: 8, // encargado1
        fechaEnvio: new Date('2025-11-10T08:30:00')
      },
      {
        periodo: "2024",
        asunto: 'Consulta sobre tareas',
        mensaje: '¿Podrías enviarme las tareas pendientes de esta semana?',
        emisorId: 10, // alumno1
        fechaEnvio: new Date('2025-11-11T14:00:00')
      },
      {
        periodo: "2024",
        asunto: 'Recordatorio de entrega',
        mensaje: 'No olvides entregar el informe antes del viernes.',
        emisorId: 6, // profe1
        fechaEnvio: new Date('2025-11-12T09:15:00')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mensajes', null, {});
  }
};