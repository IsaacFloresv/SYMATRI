const { logs } = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    let result = await logs.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
      include: [{
        association: "usuario",
        attributes: ["id"],
        include: [{
          association: "datosPersonales",
          attributes: ["firstName", "lastName"]
        }]
      }],
    });
    res.json(result);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      res: false,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.query;
    let result = await logs.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
      include: [{
        association: "usuario",
        attributes: ["id"],
        include: [{
          association: "datosPersonales",
          attributes: ["firstName", "lastName"]
        }]
      }],
    });
    res.json(result);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      res: false,
    });
  }
};

const create = async (req, res) => {
  try {
    const registroN = req.body;
    console.log(registroN);
    let result = await logs.create(registroN, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(result);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      causa: error,
      res: false,
    });
  }
};

module.exports = {
  getAll,
  getById,
  create
};
