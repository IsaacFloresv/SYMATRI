'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const grades = [];
    for (let i = 1; i <= 12; i++) {
      grades.push({
        code: `G${i}`,
        name: `Grado ${i}`,
        level: i.toString(),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('grados', grades, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('grados', null, {});
  }
};