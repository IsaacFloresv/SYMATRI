'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('mensajes', [
      { periodo: '2024', asunto: 'Reunión de padres', mensaje: 'Hola, te escribo para confirmar la reunión del viernes a las 10am.', emisorId: 8, fechaEnvio: new Date('2025-11-10T08:30:00') },
      { periodo: '2024', asunto: 'Consulta sobre tareas', mensaje: '¿Podrías enviarme las tareas pendientes de esta semana?', emisorId: 10, fechaEnvio: new Date('2025-11-11T14:00:00') },
      { periodo: '2024', asunto: 'Recordatorio de entrega', mensaje: 'No olvides entregar el informe antes del viernes.', emisorId: 6, fechaEnvio: new Date('2025-11-12T09:15:00') },
      { periodo: '2024', asunto: 'Cambio de horario', mensaje: 'La clase del martes cambia a las 10:30.', emisorId: 6, fechaEnvio: new Date('2025-11-13T10:00:00') },
      { periodo: '2024', asunto: 'Salida escolar', mensaje: 'Salida al museo el próximo jueves.', emisorId: 7, fechaEnvio: new Date('2025-11-14T09:00:00') },
      { periodo: '2024', asunto: 'Tarea adicional', mensaje: 'Adjunto material para el proyecto.', emisorId: 6, fechaEnvio: new Date('2025-11-15T11:30:00') },
      { periodo: '2024', asunto: 'Aviso administrativo', mensaje: 'Pago de matrícula disponible.', emisorId: 4, fechaEnvio: new Date('2025-11-16T08:45:00') },
      { periodo: '2024', asunto: 'Recordatorio examen', mensaje: 'El examen es este viernes.', emisorId: 7, fechaEnvio: new Date('2025-11-17T07:30:00') },
      { periodo: '2024', asunto: 'Reunión de equipo', mensaje: 'Reunión de profesores a las 15:00.', emisorId: 3, fechaEnvio: new Date('2025-11-18T13:00:00') },
      { periodo: '2024', asunto: 'Cambio de aula', mensaje: 'La clase de hoy será en el aula 12.', emisorId: 6, fechaEnvio: new Date('2025-11-19T08:30:00') },
      { periodo: '2024', asunto: 'Material extra', mensaje: 'Subí lecturas adicionales.', emisorId: 6, fechaEnvio: new Date('2025-11-20T09:15:00') },
      { periodo: '2024', asunto: 'Encuesta', mensaje: 'Completa la encuesta de evaluación.', emisorId: 4, fechaEnvio: new Date('2025-11-21T10:00:00') },
      { periodo: '2024', asunto: 'Cierre de actividades', mensaje: 'Recordatorio: cierre del trimestre.', emisorId: 5, fechaEnvio: new Date('2025-11-22T14:20:00') },
      { periodo: '2024', asunto: 'Horario especial', mensaje: 'Horario especial por feria.', emisorId: 7, fechaEnvio: new Date('2025-11-23T08:00:00') },
      { periodo: '2024', asunto: 'Felicitaciones', mensaje: 'Felicitaciones por el proyecto entregado.', emisorId: 6, fechaEnvio: new Date('2025-11-24T12:00:00') }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mensajes', null, {});
  }
};