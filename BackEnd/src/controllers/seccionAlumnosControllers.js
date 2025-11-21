const { seccionAlumnos, secciones, User, dataUser } = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    let result = await secciones.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: seccionAlumnos,
          attributes: ["id"],
          as: "seccionA",
          include: [
            {
              model: User,
              attributes: ["id"],
              as: "alumnoS",
              include: [
                {
                  model: dataUser,
                  attributes: { exclude: ["userId", "id", "address", "telefono", "createdAt", "updatedAt"] },
                  as: "datosPersonales",
                }],
            },
          ]
        },
      ]
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
    const { id } = req.body;
    let result = await secciones.findAll({
      where:{id},
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: seccionAlumnos,
          attributes: ["id"],
          as: "seccionA",
          include: [
            {
              model: User,
              attributes: ["id"],
              as: "alumnoS",
              include: [
                {
                  model: dataUser,
                  attributes: { exclude: ["userId", "id", "address", "telefono", "createdAt", "updatedAt"] },
                  as: "datosPersonales",
                }],
            },
          ]
        },
      ]
    });
    res.json(result);
  } catch (error) {
    console.log(error)
    res.json({
      message: "No fue posible obtener la informacion",
      res: false,
    });
  }
};

const create = async (req, res) => {
  try {
    const registroN = req.body;
    let seccionA = await seccionAlumnos.bulkCreate(registroN);
    res.json(seccionA);
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
    let seccionA = await seccionAlumnos.update(registroU, {
      where: { id: registroU.id },
    });
    res.json(seccionA);
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
    let seccionA = await seccionAlumnos.update(registro, {
      where: { id: registro.id },
      fields: ["active"],
    });
    res.json(seccionA);
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
    const { id } = req.body;
    const registro = {}
    let seccionA = await seccionAlumnos.update(registro, {
      where: { id },
      fields: ["active"],
    });
    res.json(seccionA);
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
