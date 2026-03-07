const express = require("express");
const router = express.Router();

const {getAll, getAllById, getById, create, update, isReaded, isArchived, deleteR} = require("../controllers/mensajesControllers");

router.get("/", (req, res) => {
  res.json({ mensajes: "aqui" });
});

router.get("/all", getAll);
router.get("/byallid", getAllById);
router.get("/byid", (req, res) => {
  // if caller supplies emisorId we want all messages sent by that user
  if (req.query.emisorId) return getAllById(req, res);
  return getById(req, res);
});
router.post("/create", create);
router.put("/update", update);
router.patch("/isReaded", isReaded);
router.patch("/isArchived", isArchived);
router.patch("/delete", deleteR)

module.exports = router;
