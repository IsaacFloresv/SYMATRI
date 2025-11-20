'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mensajeReceptors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mensajeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mensajes',
          key: 'id',
        }
      },
      receptorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      leido: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      fechaLectura: {
        type: Sequelize.DATE,
        allowNull: true,
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
    await queryInterface.dropTable('mensajeReceptors');
  },
};