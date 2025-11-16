const { notas } = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    let Notas = await notas.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
       {
          model: dataUser,
          attributes: { exclude: ["userId","id","createdAt", "updatedAt"] },
          as: "datosPersonales",
        },
      ],
    });
    res.json(Notas);
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
    let Nota = await notas.findOne({
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
    res.json(Nota);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      res: false,
    });
  }
};

const create = async (req, res) => {
  try {
    const { registroN } = req.body;
    let Nota = await notas.create(registroN, {
      //attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(Nota);
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
    const { registroU } = req.body;
    let Nota = await notas.update(registroU, {
      where: { id: registroU.id },
    });
    res.json(Nota);
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
    let Nota = await notas.update(registro, {
      where: { id: registro.id },
      fields: ["active"],
    });
    res.json(Nota);
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
    const { registro } = req.body;
    let Nota = await notas.update(registro, {
      where: { id: registro.id },
      attributes: ["active"],
    });
    res.json(Nota);
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
