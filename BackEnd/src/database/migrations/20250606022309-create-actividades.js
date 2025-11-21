'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('actividades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      periodo: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      fechaInicio: {
        type: Sequelize.DATEONLY
      },
      fechaFinal: {
        type: Sequelize.DATEONLY
      },
      horaInicio: {
        type: Sequelize.TIME
      },
      horaFinal: {
        type: Sequelize.TIME
      },
      ubicacion: {
        type: Sequelize.TEXT
      },
      objetivo: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('actividades');
  }
};