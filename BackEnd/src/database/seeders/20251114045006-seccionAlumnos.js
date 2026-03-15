"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "seccionAlumnos",
      [
        // Seccion 1 (10 alumnos)
        { periodo: "2026", seccionId: "1", alumnoId: 1 },
        { periodo: "2026", seccionId: "1", alumnoId: 2 },
        { periodo: "2026", seccionId: "1", alumnoId: 3 },
        { periodo: "2026", seccionId: "1", alumnoId: 4 },
        { periodo: "2026", seccionId: "1", alumnoId: 5 },
        { periodo: "2026", seccionId: "1", alumnoId: 6 },
        { periodo: "2026", seccionId: "1", alumnoId: 7 },
        { periodo: "2026", seccionId: "1", alumnoId: 8 },
        { periodo: "2026", seccionId: "1", alumnoId: 9 },
        { periodo: "2026", seccionId: "1", alumnoId: 10 },

        // Seccion 2 (10 alumnos)
        { periodo: "2026", seccionId: "2", alumnoId: 11 },
        { periodo: "2026", seccionId: "2", alumnoId: 12 },
        { periodo: "2026", seccionId: "2", alumnoId: 13 },
        { periodo: "2026", seccionId: "2", alumnoId: 14 },
        { periodo: "2026", seccionId: "2", alumnoId: 15 },
        { periodo: "2026", seccionId: "2", alumnoId: 16 },
        { periodo: "2026", seccionId: "2", alumnoId: 17 },
        { periodo: "2026", seccionId: "2", alumnoId: 18 },
        { periodo: "2026", seccionId: "2", alumnoId: 19 },
        { periodo: "2026", seccionId: "2", alumnoId: 20 },

        // Seccion 3 (10 alumnos)
        { periodo: "2026", seccionId: "3", alumnoId: 21 },
        { periodo: "2026", seccionId: "3", alumnoId: 22 },
        { periodo: "2026", seccionId: "3", alumnoId: 23 },
        { periodo: "2026", seccionId: "3", alumnoId: 24 },
        { periodo: "2026", seccionId: "3", alumnoId: 25 },
        { periodo: "2026", seccionId: "3", alumnoId: 26 },
        { periodo: "2026", seccionId: "3", alumnoId: 27 },
        { periodo: "2026", seccionId: "3", alumnoId: 28 },
        { periodo: "2026", seccionId: "3", alumnoId: 29 },
        { periodo: "2026", seccionId: "3", alumnoId: 30 },

        // Seccion 4 (10 alumnos)
        { periodo: "2026", seccionId: "4", alumnoId: 31 },
        { periodo: "2026", seccionId: "4", alumnoId: 32 },
        { periodo: "2026", seccionId: "4", alumnoId: 33 },
        { periodo: "2026", seccionId: "4", alumnoId: 34 },
        { periodo: "2026", seccionId: "4", alumnoId: 35 },
        { periodo: "2026", seccionId: "4", alumnoId: 36 },
        { periodo: "2026", seccionId: "4", alumnoId: 37 },
        { periodo: "2026", seccionId: "4", alumnoId: 38 },
        { periodo: "2026", seccionId: "4", alumnoId: 39 },
        { periodo: "2026", seccionId: "4", alumnoId: 40 },

        // Seccion 5 (10 alumnos)
        { periodo: "2026", seccionId: "5", alumnoId: 41 },
        { periodo: "2026", seccionId: "5", alumnoId: 42 },
        { periodo: "2026", seccionId: "5", alumnoId: 43 },
        { periodo: "2026", seccionId: "5", alumnoId: 44 },
        { periodo: "2026", seccionId: "5", alumnoId: 45 },
        { periodo: "2026", seccionId: "5", alumnoId: 46 },
        { periodo: "2026", seccionId: "5", alumnoId: 47 },
        { periodo: "2026", seccionId: "5", alumnoId: 48 },
        { periodo: "2026", seccionId: "5", alumnoId: 49 },
        { periodo: "2026", seccionId: "5", alumnoId: 50 },

        // Seccion 6 (10 alumnos)
        { periodo: "2026", seccionId: "6", alumnoId: 51 },
        { periodo: "2026", seccionId: "6", alumnoId: 52 },
        { periodo: "2026", seccionId: "6", alumnoId: 53 },
        { periodo: "2026", seccionId: "6", alumnoId: 54 },
        { periodo: "2026", seccionId: "6", alumnoId: 55 },
        { periodo: "2026", seccionId: "6", alumnoId: 56 },
        { periodo: "2026", seccionId: "6", alumnoId: 57 },
        { periodo: "2026", seccionId: "6", alumnoId: 58 },
        { periodo: "2026", seccionId: "6", alumnoId: 59 },
        { periodo: "2026", seccionId: "6", alumnoId: 60 },

        // Seccion 7 (10 alumnos)
        { periodo: "2026", seccionId: "7", alumnoId: 61 },
        { periodo: "2026", seccionId: "7", alumnoId: 62 },
        { periodo: "2026", seccionId: "7", alumnoId: 63 },
        { periodo: "2026", seccionId: "7", alumnoId: 64 },
        { periodo: "2026", seccionId: "7", alumnoId: 65 },
        { periodo: "2026", seccionId: "7", alumnoId: 66 },
        { periodo: "2026", seccionId: "7", alumnoId: 67 },
        { periodo: "2026", seccionId: "7", alumnoId: 68 },
        { periodo: "2026", seccionId: "7", alumnoId: 69 },
        { periodo: "2026", seccionId: "7", alumnoId: 70 },

        // Seccion 8 (10 alumnos)
        { periodo: "2026", seccionId: "8", alumnoId: 71 },
        { periodo: "2026", seccionId: "8", alumnoId: 72 },
        { periodo: "2026", seccionId: "8", alumnoId: 73 },
        { periodo: "2026", seccionId: "8", alumnoId: 74 },
        { periodo: "2026", seccionId: "8", alumnoId: 75 },
        { periodo: "2026", seccionId: "8", alumnoId: 76 },
        { periodo: "2026", seccionId: "8", alumnoId: 77 },
        { periodo: "2026", seccionId: "8", alumnoId: 78 },
        { periodo: "2026", seccionId: "8", alumnoId: 79 },
        { periodo: "2026", seccionId: "8", alumnoId: 80 },

        // Seccion 9 (10 alumnos)
        { periodo: "2026", seccionId: "9", alumnoId: 81 },
        { periodo: "2026", seccionId: "9", alumnoId: 82 },
        { periodo: "2026", seccionId: "9", alumnoId: 83 },
        { periodo: "2026", seccionId: "9", alumnoId: 84 },
        { periodo: "2026", seccionId: "9", alumnoId: 85 },
        { periodo: "2026", seccionId: "9", alumnoId: 86 },
        { periodo: "2026", seccionId: "9", alumnoId: 87 },
        { periodo: "2026", seccionId: "9", alumnoId: 88 },
        { periodo: "2026", seccionId: "9", alumnoId: 89 },
        { periodo: "2026", seccionId: "9", alumnoId: 90 },

        // Seccion 10 (10 alumnos)
        { periodo: "2026", seccionId: "10", alumnoId: 91 },
        { periodo: "2026", seccionId: "10", alumnoId: 92 },
        { periodo: "2026", seccionId: "10", alumnoId: 93 },
        { periodo: "2026", seccionId: "10", alumnoId: 94 },
        { periodo: "2026", seccionId: "10", alumnoId: 95 },
        { periodo: "2026", seccionId: "10", alumnoId: 96 },
        { periodo: "2026", seccionId: "10", alumnoId: 97 },
        { periodo: "2026", seccionId: "10", alumnoId: 98 },
        { periodo: "2026", seccionId: "10", alumnoId: 99 },
        { periodo: "2026", seccionId: "10", alumnoId: 100 },

        // Seccion 11 (10 alumnos)
        { periodo: "2026", seccionId: "11", alumnoId: 101 },
        { periodo: "2026", seccionId: "11", alumnoId: 102 },
        { periodo: "2026", seccionId: "11", alumnoId: 103 },
        { periodo: "2026", seccionId: "11", alumnoId: 104 },
        { periodo: "2026", seccionId: "11", alumnoId: 105 },
        { periodo: "2026", seccionId: "11", alumnoId: 106 },
        { periodo: "2026", seccionId: "11", alumnoId: 107 },
        { periodo: "2026", seccionId: "11", alumnoId: 108 },
        { periodo: "2026", seccionId: "11", alumnoId: 109 },
        { periodo: "2026", seccionId: "11", alumnoId: 110 },

        // Seccion 12 (10 alumnos)
        { periodo: "2026", seccionId: "12", alumnoId: 111 },
        { periodo: "2026", seccionId: "12", alumnoId: 112 },
        { periodo: "2026", seccionId: "12", alumnoId: 113 },
        { periodo: "2026", seccionId: "12", alumnoId: 114 },
        { periodo: "2026", seccionId: "12", alumnoId: 115 },
        { periodo: "2026", seccionId: "12", alumnoId: 116 },
        { periodo: "2026", seccionId: "12", alumnoId: 117 },
        { periodo: "2026", seccionId: "12", alumnoId: 118 },
        { periodo: "2026", seccionId: "12", alumnoId: 119 },
        { periodo: "2026", seccionId: "12", alumnoId: 120 },

        // Seccion 13 (10 alumnos)
        { periodo: "2026", seccionId: "13", alumnoId: 121 },
        { periodo: "2026", seccionId: "13", alumnoId: 122 },
        { periodo: "2026", seccionId: "13", alumnoId: 123 },
        { periodo: "2026", seccionId: "13", alumnoId: 124 },
        { periodo: "2026", seccionId: "13", alumnoId: 125 },
        { periodo: "2026", seccionId: "13", alumnoId: 126 },
        { periodo: "2026", seccionId: "13", alumnoId: 127 },
        { periodo: "2026", seccionId: "13", alumnoId: 128 },
        { periodo: "2026", seccionId: "13", alumnoId: 129 },
        { periodo: "2026", seccionId: "13", alumnoId: 130 },

        // Seccion 14 (10 alumnos)
        { periodo: "2026", seccionId: "14", alumnoId: 131 },
        { periodo: "2026", seccionId: "14", alumnoId: 132 },
        { periodo: "2026", seccionId: "14", alumnoId: 133 },
        { periodo: "2026", seccionId: "14", alumnoId: 134 },
        { periodo: "2026", seccionId: "14", alumnoId: 135 },
        { periodo: "2026", seccionId: "14", alumnoId: 136 },
        { periodo: "2026", seccionId: "14", alumnoId: 137 },
        { periodo: "2026", seccionId: "14", alumnoId: 138 },
        { periodo: "2026", seccionId: "14", alumnoId: 139 },
        { periodo: "2026", seccionId: "14", alumnoId: 140 },

        // Seccion 15 (10 alumnos)
        { periodo: "2026", seccionId: "15", alumnoId: 141 },
        { periodo: "2026", seccionId: "15", alumnoId: 142 },
        { periodo: "2026", seccionId: "15", alumnoId: 143 },
        { periodo: "2026", seccionId: "15", alumnoId: 144 },
        { periodo: "2026", seccionId: "15", alumnoId: 145 },
        { periodo: "2026", seccionId: "15", alumnoId: 146 },
        { periodo: "2026", seccionId: "15", alumnoId: 147 },
        { periodo: "2026", seccionId: "15", alumnoId: 148 },
        { periodo: "2026", seccionId: "15", alumnoId: 149 },
        { periodo: "2026", seccionId: "15", alumnoId: 150 }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("seccionAlumnos", null, {});
  },
};
