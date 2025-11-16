'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('materias', [
      {
        name: 'Matemáticas',
        description: 'Estudio de números, álgebra, geometría y cálculo.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ciencias Naturales',
        description: 'Exploración de la biología, química y física básica.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Estudios Sociales',
        description: 'Historia, geografía y ciudadanía.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Inglés',
        description: 'Lengua extranjera enfocada en comprensión y expresión oral y escrita.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Educación Física',
        description: 'Desarrollo físico, coordinación y trabajo en equipo.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('materias', null, {});
  }
};