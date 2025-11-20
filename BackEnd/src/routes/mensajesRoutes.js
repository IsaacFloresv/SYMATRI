const express = require("express");
const router = express.Router();

const {getAll, getById, create, update, isReaded, isArchived, deleteR} = require("../controllers/mensajesControllers");

router.get("/", (req, res) => {
  res.json({ mensajes: "aqui" });
});

router.get("/all", getAll);

router.get("/byid", getById);
router.post("/create", create);
router.put("/update", update);
router.patch("/isReaded", isReaded);
router.patch("/isArchived", isArchived);
router.patch("/delete", deleteR)

module.exports = router;
