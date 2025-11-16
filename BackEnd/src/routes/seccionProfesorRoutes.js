const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  create,
  update
} = require("../controllers/seccionProfesorControllers");

router.get("/", (req, res) => {
  res.json({ seccionprofesor: "aqui" });
});

router.get("/all", getAll);
router.get("/byid", getById);
router.post("/create", create);
router.put("/update", update);

module.exports = router;
