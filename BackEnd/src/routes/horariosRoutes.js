const express = require("express");
const router = express.Router();

const {getAll, getById, create, update, validate, deleteR} = require("../controllers/horariosControllers");

router.get("/", (req, res) => {
  res.json({ horarios: "aqui" });
});

router.get("/all", getAll);

router.get("/byid", getById);
router.post("/create", create);
router.put("/update", update);
router.patch("/validate", validate);
router.patch("/delete", deleteR)

module.exports = router;
