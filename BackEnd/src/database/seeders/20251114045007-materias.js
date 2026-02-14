'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('materias', [
      { name: 'Matemáticas', description: 'Estudio de números, álgebra, geometría y cálculo.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ciencias Naturales', description: 'Exploración de la biología, química y física básica.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Estudios Sociales', description: 'Historia, geografía y ciudadanía.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Inglés', description: 'Lengua extranjera enfocada en comprensión y expresión oral y escrita.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Educación Física', description: 'Desarrollo físico, coordinación y trabajo en equipo.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Química', description: 'Conceptos fundamentales de química.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Física', description: 'Mecánica y termodinámica básica.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Biología', description: 'Biología celular y ecología.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Historia', description: 'Historia universal y regional.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Geografía', description: 'Geografía física y humana.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Arte', description: 'Expresión plástica y teoría del arte.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Música', description: 'Fundamentos de música y apreciación.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tecnología', description: 'Introducción a la tecnología y computación.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Educación Cívica', description: 'Formación ciudadana y ética.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Economía', description: 'Conceptos básicos de economía.', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('materias', null, {});
  }
};