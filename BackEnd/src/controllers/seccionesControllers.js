const { secciones } = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    let users = await secciones.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
       {
          model: dataUser,
          attributes: { exclude: ["userId","id","createdAt", "updatedAt"] },
          as: "datosPersonales",
        },
      ],
    });
    res.json(users);
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
    let secciones = await secciones.findOne({
      where: id,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: dataUser,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          as: "datosPersonales",
        },
      ],
    });
    res.json(secciones);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      res: false,
    });
  }
};

const create = async (req, res) => {
  try {
    const { seccion } = req.body;
    let secciones = await secciones.create(seccion, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(secciones);
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
    const { seccion } = req.body;
    let secciones = await secciones.update(seccion, {
      where: { id: seccion.id },
    });
    res.json(secciones);
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
    const { seccion } = req.body;
    let secciones = await secciones.update(seccion, {
      where: { id: seccion.id },
      fields: ["active"],
    });
    res.json(secciones);
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
    const { seccion } = req.body;
    let secciones = await secciones.update(seccion, {
      where: { id: seccion.id },
      attributes: ["active"],
    });
    res.json(secciones);
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
