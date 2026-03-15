const express = require("express");
const router = express.Router();

//Schema y validador
const { createUsuarioSchema,
  updateUsuarioSchema,
  getSchema } = require("@schemas/asistenciaSchema");
const validateSchema = require("@middlewares/validateSchema");

const { getAll, getAllById, getById, create, update, validate, deleteR } = require("../controllers/asistenciaControllers");

router.get("/", (req, res) => {
  res.json({ Asistencia: "aqui" });
});

router.get("/all", getAll);
router.get("/allbyid", getAllById);
router.get("/byid", getById);
router.post("/create", create);
router.put("/update", update);
router.patch("/validate", validate);
router.put("/delete", deleteR)
module.exports = router;
