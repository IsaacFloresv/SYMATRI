const { roles } = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    let Roles = await roles.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    res.json(Roles);
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
    let Rol = await roles.findOne({
      where: {id},
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      }
    });
    res.json(Rol);
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
    let Rol = await roles.create(registroN, {
      //attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(Rol);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      causa: error,
      res: false,
    });
  }
};

const update = async (req, res) => {
  try {
    const registroU = req.body;
    let Rol = await roles.update(registroU, {
      where: { id: registroU.id },
    });
    res.json(Rol);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      causa: error,
      res: false,
    });
  }
};

const validate = async (req, res) => {
  try {
    const { registro } = req.body;
    let Rol = await seccionAlumnos.update(registro, {
      where: { id: registro.id },
      fields: ["active"],
    });
    res.json(Rol);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      causa: error,
      res: false,
    });
  }
};

const deleteR = async (req, res) => {
  try {
    const {id} = req.body;
    const modules = []
    let Rol = await seccionAlumnos.update(modules, {
      where: { id},
      fields: ["modules"],
    });
    res.json(Rol);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      cause: error,
      res: false,
    });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  validate,
  deleteR,
};
