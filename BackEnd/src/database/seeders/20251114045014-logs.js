'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('logs', [
      { nameTable: 'Notas', userId: 1, estado: true, valorAnterior: '{"Materia":"Ciencias","Nota":"45"}', valorActual: '{"Materia":"Ciencias","Nota":"75"}' },
      { nameTable: 'Notas', userId: 2, estado: false, valorAnterior: '{"Materia":"Ciencias","Nota":"45"}', valorActual: '{"Materia":"Fisica","Nota":"85"}' },
      { nameTable: 'Actividades', userId: 6, estado: true, valorAnterior: '{"name":"Taller A"}', valorActual: '{"name":"Taller B"}' },
      { nameTable: 'Usuarios', userId: 4, estado: true, valorAnterior: '{"active":false}', valorActual: '{"active":true}' },
      { nameTable: 'Horarios', userId: 3, estado: true, valorAnterior: '{"inicio":"08:00"}', valorActual: '{"inicio":"08:30"}' },
      { nameTable: 'Mensajes', userId: 8, estado: false, valorAnterior: '{"leido":false}', valorActual: '{"leido":true}' },
      { nameTable: 'Notas', userId: 6, estado: true, valorAnterior: '{"nota":"70"}', valorActual: '{"nota":"85"}' },
      { nameTable: 'Actividades', userId: 7, estado: true, valorAnterior: '{"ubicacion":"Sala 1"}', valorActual: '{"ubicacion":"Auditorio"}' },
      { nameTable: 'Secciones', userId: 6, estado: true, valorAnterior: '{"name":"8-1"}', valorActual: '{"name":"8-1 B"}' },
      { nameTable: 'Usuarios', userId: 2, estado: false, valorAnterior: '{"roleId":2}', valorActual: '{"roleId":3}' },
      { nameTable: 'Materias', userId: 6, estado: true, valorAnterior: '{"name":"Matemáticas"}', valorActual: '{"name":"Matemáticas Avanzadas"}' },
      { nameTable: 'Actividades', userId: 3, estado: false, valorAnterior: '{"estado":true}', valorActual: '{"estado":false}' },
      { nameTable: 'Mensajes', userId: 10, estado: true, valorAnterior: '{"asunto":"Hola"}', valorActual: '{"asunto":"Recordatorio"}' },
      { nameTable: 'Notas', userId: 11, estado: true, valorAnterior: '{"nota":"60"}', valorActual: '{"nota":"70"}' },
      { nameTable: 'Horarios', userId: 7, estado: true, valorAnterior: '{"final":"10:00"}', valorActual: '{"final":"10:30"}' }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('logs', null, {});
  }
};
