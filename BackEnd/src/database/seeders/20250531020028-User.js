"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          userName: "isflores",
          pass: "1234",
          email: "isflores@example.com",
          roleId: 1
        },
        {
          userName: "leloo",
          pass: "1234",
          email: "leloo@example.com",
          roleId: 2
        },
        {
          userName: "choy",
          pass: "1234",
          email: "choy@example.com",
          roleId: 3
        },
        {
          userName: "admin",
          pass: "1234",
          email: "admin@example.com",
          roleId: 4
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
