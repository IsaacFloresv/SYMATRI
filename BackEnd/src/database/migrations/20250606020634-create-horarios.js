'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('horarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      periodo: {
        type: Sequelize.STRING
      },
      seccionId: {
        type: Sequelize.INTEGER
      },
      profesorId: {
        type: Sequelize.INTEGER
      },
      dia: {
        type: Sequelize.STRING
      },
      inicio: {
        type: Sequelize.TIME
      },
      final: {
        type: Sequelize.TIME
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('horarios');
  }
};