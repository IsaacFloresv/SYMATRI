const express = require("express");
const router = express.Router();

const {getAll, getById, create} = require("../controllers/logsControllers");

router.get("/", (req, res) => {
  res.json({ logs: "aqui" });
});

router.get("/all", getAll);
router.get("/byid", getById);
router.post("/create", create);

module.exports = router;
