const express = require("express");
const router = express.Router();

const {login, registerU} = require("../controllers/loginController");

router.get("/", (req, res) => {
  res.json({ login: "aqui" });
});

router.get("/login", login);
router.post("/register", registerU);
module.exports = router;
