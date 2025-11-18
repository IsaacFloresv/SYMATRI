const { encargadoAlumnos, User, dataUser } = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    let result = await encargadoAlumnos.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: User,
          attributes: ["id"],
          as: "encargado",
          include: [
            {
              model: dataUser,
              attributes: { exclude: ["userId", "id", "createdAt", "updatedAt"] },
              as: "datosPersonales",
            }],
        },
        {
          model: User,
          attributes: ["id"],
          as: "alumno",
          include: [
            {
              model: dataUser,
              attributes: { exclude: ["userId", "id", "createdAt", "updatedAt"] },
              as: "datosPersonales",
            }],
        }
      ],
      where: { encargadoId }
    });
    res.json(result);
  } catch (error) {
      res.json({
        message: "No fue posible obtener la informacion",
        res: false,
        err: error,
      });
  }
};

const getById = async (req, res) => {
  try {
    const { encargadoId } = req.query;
    let result = await encargadoAlumnos.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["id"],
          as: "alumno",
          include: [
            {
              model: dataUser,
              attributes: { exclude: ["userId", "id", "createdAt", "updatedAt"] },
              as: "datosPersonales",
            }],
        },
        {
          model: User,
          attributes: ["id"],
          as: "encargado",
          include: [
            {
              model: dataUser,
              attributes: { exclude: ["userId", "id", "createdAt", "updatedAt"] },
              as: "datosPersonales",
            }],
        },
      ],
      where: { encargadoId }
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
    let result = await encargadoAlumnos.create(registroN, {
      //attributes: { exclude: ["createdAt", "updatedAt"] },
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
    let result = await encargadoAlumnos.update(registroU, {
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
    let result = await encargadoAlumnos.update(registro, {
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
    let result = await encargadoAlumnos.update(registro, {
      where: { id: registro.id },
      attributes: ["active"],
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
