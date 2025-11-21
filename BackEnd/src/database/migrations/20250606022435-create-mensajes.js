'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mensajes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      periodo: {
        type: Sequelize.STRING
      },
      asunto: {
        type: Sequelize.STRING
      },
      mensaje: {
        type: Sequelize.TEXT
      },
      emisorId: {
        type: Sequelize.INTEGER
      },
      isReaded: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isArchived: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      fechaEnvio: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('mensajes');
  }
};