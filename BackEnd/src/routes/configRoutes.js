const express = require("express");
const router = express.Router();

const {getAll, getById, create, update, validate, deleteR} = require("../controllers/configControllers");

router.get("/", (req, res) => {
  res.json({ config: "aqui" });
});

router.get("/all", getAll);

router.get("/byid", getById);
router.post("/create", create);
router.put("/update", update);
router.patch("/validate", validate);
router.put("/delete", deleteR)

module.exports = router;
