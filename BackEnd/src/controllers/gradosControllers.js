const { grados } = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    let result = await grados.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
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
    let result = await grados.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json({
      message: "No fue posible obtener la informacion",
      res: false,
    });
  }
};

const create = async (req, res) => {
  try {
    const payload = req.body;
    let result = await grados.create(payload);
    res.json(result);
  } catch (error) {
    res.json({
      message: "No fue posible crear grado",
      causa: error,
      res: false,
    });
  }
};

const update = async (req, res) => {
  try {
    const payload = req.body;
    let result = await grados.update(payload, {
      where: { id: payload.id },
    });
    res.json(result);
  } catch (error) {
    res.json({
      message: "No fue posible actualizar grado",
      causa: error,
      res: false,
    });
  }
};

const deleteR = async (req, res) => {
  try {
    const payload = req.body;
    // soft delete: mark inactive
    let result = await grados.update({ active: false }, { where: { id: payload.id } });
    res.json(result);
  } catch (error) {
    res.json({
      message: "No fue posible eliminar grado",
      causa: error,
      res: false,
    });
  }
};

module.exports = { getAll, getById, create, update, deleteR };
