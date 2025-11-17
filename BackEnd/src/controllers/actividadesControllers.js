const { actividades, User, dataUser } = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    const { userId } = req.query;

    const where = {};
    if (userId) where.userId = userId;

    let result = await actividades.findAll({
      where,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: User,
          attributes: ["id"],
          as: "generador",
          include: [
            {
              model: dataUser,
              attributes: ["firstName", "lastName"],
              as: "datosPersonales",
            },
          ],
        },
      ],
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
     console.log(id);
    let result = await actividades.findOne({
      where: {id},
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["id"],
          as: "generador",
          include: [
            {
              model: dataUser,
              attributes: ["firstName", "lastName"],
              as: "datosPersonales",
            },
          ],
        },
      ],
    });
    res.json(result);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.json({
      message: "No fue posible obtener la informacion",
      res: false,
    });
  }
};

const create = async (req, res) => {
  try {
    const registroN = req.body;
    let result = await actividades.create(registroN, {
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

const update = async (req, res) => {
  try {
    const registroU = req.body;
    let result = await actividades.update(registroU, {
      where: { id: registroU.id },
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

const validate = async (req, res) => {
  try {
    const registro = req.body;
    let result = await actividades.update(registro, {
      where: { id: registro.id },
      fields: ["active"],
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

const deleteR = async (req, res) => {
  try {
    const registro = req.body;
    let result = await actividades.update(registro, {
      where: { id: registro.id },
      attributes: ["estado"],
    });
    res.json(result);
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
