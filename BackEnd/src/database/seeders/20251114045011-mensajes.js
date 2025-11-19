'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('mensajes', [
      {
        asunto: 'Reunión de padres',
        mensaje: 'Hola, te escribo para confirmar la reunión del viernes a las 10am.',
        emisorId: 8, // encargado1
        receptorId: "['1','2','3']",
        leido: 0,
        fechaEnvio: new Date('2025-11-10T08:30:00'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        asunto: 'Consulta sobre tareas',
        mensaje: '¿Podrías enviarme las tareas pendientes de esta semana?',
        emisorId: 10, // alumno1
        receptorId: "['4','5','6']",
        leido: 0,
        fechaEnvio: new Date('2025-11-11T14:00:00'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        asunto: 'Recordatorio de entrega',
        mensaje: 'No olvides entregar el informe antes del viernes.',
        emisorId: 6, // profe1
        receptorId: "['1','3','5']",
        leido: 0,
        fechaEnvio: new Date('2025-11-12T09:15:00'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mensajes', null, {});
  }
};