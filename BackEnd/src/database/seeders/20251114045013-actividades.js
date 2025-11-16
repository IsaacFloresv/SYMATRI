'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('actividades', [
      {
        name: 'Taller de liderazgo',
        descripcion: 'Sesión interactiva sobre habilidades de liderazgo.',
        userId: 1,
        estado: true,
        fechaInicio: new Date('2025-11-20'),
        fechaFinal: new Date('2025-11-20'),
        horaInicio: '09:00:00',
        horaFinal: '12:00:00',
        ubicacion: 'Sala 3, Edificio A',
        objetivo: 'Fomentar el liderazgo entre los participantes.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Charla técnica',
        descripcion: 'Presentación sobre nuevas tecnologías en desarrollo web.',
        userId: 2,
        estado: true,
        fechaInicio: new Date('2025-11-22'),
        fechaFinal: new Date('2025-11-22'),
        horaInicio: '14:00:00',
        horaFinal: '16:00:00',
        ubicacion: 'Auditorio principal',
        objetivo: 'Actualizar conocimientos técnicos del equipo.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('actividades', null, {});
  }
};