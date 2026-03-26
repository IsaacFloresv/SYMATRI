'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipoNotas', [
      { nombre: 'T1-Tarea1', descripcion: 'Tarea 1', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'T2-Tarea2', descripcion: 'Tarea 2', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'E1-Exa1', descripcion: 'Examen 1', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'E2-Exa2', descripcion: 'Examen 2', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Proyecto', descripcion: 'Proyecto', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Parcial', descripcion: 'Parcial', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Final', descripcion: 'Examen final', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Recuperacion', descripcion: 'Recuperación', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Oral', descripcion: 'Evaluación oral', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Practica', descripcion: 'Nota de práctica', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Participacion', descripcion: 'Participación en clase', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'ExamenSorpresa', descripcion: 'Examen sorpresa', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Taller', descripcion: 'Taller / actividad', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Laboratorio', descripcion: 'Práctica de laboratorio', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Extra', descripcion: 'Extra / bonus', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Conducta', descripcion: 'Conducta', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tipoNotas', null, {});
  }
};
