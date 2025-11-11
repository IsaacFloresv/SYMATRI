const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  createD,
  updateD
} = require("../controllers/seccionProfesorControllers");

router.get("/", (req, res) => {
  res.json({ seccionprofesor: "aqui" });
});

router.get("/all", getAll);
router.get("/byid", getById);
router.post("/create", createD);
router.put("/update", updateD);

module.exports = router;
