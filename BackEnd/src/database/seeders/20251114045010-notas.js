'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('notas', [
      { periodo: '2024', alumnoId: 10, materiaId: 1, usuarioId: 6, tipoId: 1, nota: '85.5' },
      { periodo: '2024', alumnoId: 10, materiaId: 1, usuarioId: 6, tipoId: 2, nota: '86.5' },
      { periodo: '2024', alumnoId: 10, materiaId: 2, usuarioId: 7, tipoId: 4, nota: '92.0' },
      { periodo: '2024', alumnoId: 10, materiaId: 3, usuarioId: 6, tipoId: 3, nota: '78.25' },
      { periodo: '2024', alumnoId: 11, materiaId: 1, usuarioId: 6, tipoId: 1, nota: '85.5' },
      { periodo: '2024', alumnoId: 11, materiaId: 1, usuarioId: 6, tipoId: 2, nota: '86.5' },
      { periodo: '2024', alumnoId: 11, materiaId: 2, usuarioId: 7, tipoId: 4, nota: '92.0' },
      { periodo: '2024', alumnoId: 11, materiaId: 3, usuarioId: 6, tipoId: 3, nota: '78.25' },
      { periodo: '2024', alumnoId: 12, materiaId: 4, usuarioId: 6, tipoId: 1, nota: '88.0' },
      { periodo: '2024', alumnoId: 12, materiaId: 5, usuarioId: 7, tipoId: 2, nota: '79.5' },
      { periodo: '2024', alumnoId: 13, materiaId: 6, usuarioId: 6, tipoId: 3, nota: '91.0' },
      { periodo: '2024', alumnoId: 13, materiaId: 7, usuarioId: 7, tipoId: 4, nota: '76.5' },
      { periodo: '2024', alumnoId: 14, materiaId: 8, usuarioId: 6, tipoId: 1, nota: '84.0' },
      { periodo: '2024', alumnoId: 15, materiaId: 9, usuarioId: 7, tipoId: 2, nota: '87.5' },
      { periodo: '2024', alumnoId: 16, materiaId: 10, usuarioId: 6, tipoId: 3, nota: '93.25' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notas', null, {});
  }
};