const express = require("express");
const router = express.Router();

const {getAll, getById, createU, updateU, validateU, deleteU} = require("../controllers/usersControllers");

router.get("/", (req, res) => {
  res.json({ users: "aqui" });
});

router.get("/all", getAll);

router.get("/byid", getById);
router.post("/create", createU);
router.put("/update", updateU);
router.patch("/validate", validateU);
router.patch("/delete", deleteU)
module.exports = router;
