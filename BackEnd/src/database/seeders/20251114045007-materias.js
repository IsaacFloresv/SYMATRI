'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('materias', [
      { name: 'Matemáticas', description: 'Estudio de números, álgebra, geometría y cálculo.', gradoId: 7, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ciencias Naturales', description: 'Exploración de la biología, química y física básica.', gradoId: 7, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Estudios Sociales', description: 'Historia, geografía y ciudadanía.', gradoId: 7, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Inglés', description: 'Lengua extranjera enfocada en comprensión y expresión oral y escrita.', gradoId: 7, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Educación Física', description: 'Desarrollo físico, coordinación y trabajo en equipo.', gradoId: 8, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Química', description: 'Conceptos fundamentales de química.', gradoId: 8, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Física', description: 'Mecánica y termodinámica básica.', gradoId: 8, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Biología', description: 'Biología celular y ecología.', gradoId: 9, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Historia', description: 'Historia universal y regional.', gradoId: 9, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Geografía', description: 'Geografía física y humana.', gradoId: 9, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Arte', description: 'Expresión plástica y teoría del arte.', gradoId: 10, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Música', description: 'Fundamentos de música y apreciación.', gradoId: 10, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tecnología', description: 'Introducción a la tecnología y computación.', gradoId: 11, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Educación Cívica', description: 'Formación ciudadana y ética.', gradoId: 12, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Economía', description: 'Conceptos básicos de economía.', gradoId: 12, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Conducta', description: 'Comportamiento en clase, participacion, manera de expresarse y respeto demostrado en todo aspecto de la vida estudiantil.', gradoId: 12, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('materias', null, {});
  }
};