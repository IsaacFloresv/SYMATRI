"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          userName: "soporte",
          pass: "$2b$10$6O4QVIqOXhvWkyO33u35/uL.6HvyFwYCXXFyuCcFr2sSqpt/yAaq2", //1234
          email: "soporte@example.com",
          roleId: 0,
          active: true
        },
        {
          userName: "leloo",
          pass: "$2b$10$eTdJ6wo2uMDxXadSDYL26OvlUb72LJw4serGRVBuTZcDMAJen9eR6", //1234
          email: "leloo@example.com",
          roleId: 2,
          active: true
        },
        {
          userName: "choy",
          pass: "$2b$10$MhtE0tmuCjWNpgImxutrkuOIyWQ0LzeroYRfmeeqaAwK0K60L8Lwi", //1234
          email: "choy@example.com",
          roleId: 3,
          active: true
        },
        {
          userName: "admin",
          pass: "$2b$10$68mv11cZx6HgVcrA8WsKRuAjlpv1rc09wyUwtt2P0QstCf.g6CkJG", //1234
          email: "admin@example.com",
          roleId: 4,
          active: true
        },
        {
          userName: "admin2",
          pass: "$2b$10$v6k62gF6/qpFcdwB0xiRSub9PEUZyzzsoQLFdpoiW9igzrk0KismW", //1234
          email: "admin2@example.com",
          roleId: 4,
          active: true
        },
        {
          userName: "profe1",
          pass: "$2b$10$i089UkQNID/mIOv1.Nq8n.1/t49plH1BgxpFMVdPAdQIC9L4l8b66", //1234
          email: "profe1@example.com",
          roleId: 3,
          active: true
        },
        {
          userName: "pref2",
          pass: "$2b$10$NmgnibvdRikCzAWuZSRBNuZUsF1DhhjqMxGBU.DbVV0Mn9VotwijS", //1234
          email: "profe2@example.com",
          roleId: 3,
          active: true
        },
        {
          userName: "encargado1",
          pass: "$2b$10$Gb4QtmhwMUzFy0.zXGVMmuqO4SfroH7JNT26O3R1Sz6nSswhv6VrW", //1234
          email: "encargado1@example.com",
          roleId: 2,
          active: true
        },
        {
          userName: "encargado2",
          pass: "$2b$10$YEWpQbp.WJe3ELXrdQge4O4w/41/TTMVxSTp3rhVvKoznGynSlMdC", //1234
          email: "encargado2@example.com",
          roleId: 2,
          active: true
        },
        {
          userName: "alumno1",
          pass: "$2b$10$83hmGQgre2mJTPGciioBJe3/nGReDazPq28vjJSVl90AeVNvYxFgS", //1234
          email: "alumno1@example.com",
          roleId: 4,
          active: true
        },
        {
          userName: "alumno2",
          pass: "$2b$10$L7JHumqFI1q2TLjx674.mOu40Otz79quDqmwRrg8QKtubwTYjz67y", //1234
          email: "alumno2@example.com",
          roleId: 4,
          active: true
        },
        {
          userName: "alumno3",
          pass: "$2b$10$L.nNHB8G7I3EEUsvpTMdqeUfiUF5nHCGn15j2t4ywknQjlkJsTLSy", //1234
          email: "alumno3@example.com",
          roleId: 4,
          active: true
        },
        {
          userName: "alumno4",
          pass: "$2b$10$a0Hing0zeoUW8jnhBHgfTeQNxA.8q5tEyNDMLFEBr3ClPG1ATDISK", //1234
          email: "alumno4@example.com",
          roleId: 4,
          active: true
        },
        {
          userName: "SantiVargas",
          pass: "$2b$10$9NdPpQPzT.BK4kbj7cnUqOpI71SJ/nnsXxqNSUGlOy2Dt2cG1tF62", //1234
          email: "santivargas@example.com",
          roleId: 1,
          active: true
        },
        {
          userName: "abigailRod",
          pass: "$2b$10$6O4QVIqOXhvWkyO33u35/uL.6HvyFwYCXXFyuCcFr2sSqpt/yAaq2", //1234
          email: "abigailrod@example.com",
          roleId: 1,
          active: true
        },
        {
          userName: "isflores",
          pass: "$2b$10$UXoXzxLOplCJuEsZq0ARYOGV5F8oPgJCbxWaBzp9.7ayUaWC9eJK2", //1234
          email: "isflores@example.com",
          roleId: 1,
          active: true
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
