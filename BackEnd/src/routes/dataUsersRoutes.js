const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  createD,
  updateD
} = require("../controllers/dataUsersControllers");

router.get("/", (req, res) => {
  res.json({ dataUsers: "aqui" });
});

router.get("/all", getAll);
router.get("/byid", getById);
router.post("/create", createD);
router.put("/update", updateD);

module.exports = router;
