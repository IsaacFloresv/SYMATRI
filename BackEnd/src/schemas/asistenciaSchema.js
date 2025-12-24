// schemas/asistenciaSchema.js
const { z } = require("zod");

// POST → crear usuario
const createUsuarioSchema = z.object({
  userName: z.string().min(3).max(50),
  email: z.string().email(),
  roleId: z.number().int().positive(),
  active: z.boolean().default(true)
});

// PUT/PATCH → actualizar usuario (campos opcionales)
const updateUsuarioSchema = z.object({
  userName: z.string().min(3).max(50).optional(),
  email: z.string().email().optional(),
  roleId: z.number().int().positive().optional(),
  active: z.boolean().optional()
});

// GET byId → solo validar el parámetro id
const getSchema = z.object({
  id: z.number().optional()// id numérico en params
});

module.exports = {
  createUsuarioSchema,
  updateUsuarioSchema,
  getSchema
};