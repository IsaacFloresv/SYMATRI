const express = require("express");
const router = express.Router();

const {login, register} = require("../controllers/loginControllers");

router.get("/", (req, res) => {
  res.json({ login: "aqui" });
});

router.post("/login", login);
router.post("/register", register);
module.exports = router;
