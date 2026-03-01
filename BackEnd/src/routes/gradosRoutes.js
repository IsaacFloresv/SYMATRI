const express = require("express");
const router = express.Router();

const { getAll, getById, create, update, deleteR } = require("../controllers/gradosControllers");

router.get("/all", getAll);
router.get("/byid", getById);
router.post("/create", create);
router.put("/update", update);
router.patch("/delete", deleteR);

module.exports = router;