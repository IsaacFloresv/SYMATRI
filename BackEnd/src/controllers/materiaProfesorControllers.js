const { materias, materiaProfesor, dataUser, User } = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    let result = await materias.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: materiaProfesor,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          as: "materia",
          include: [
            {
              model: User,
              attributes: ["id"],
              as: "profesorAsignado",
              include: [
                {
                  model: dataUser,
                  attributes: ["firstName", "lastName"],
                  as: "datosPersonales",
                },
              ],
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
    let result = await materias.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: materiaProfesor,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          as: "materia",
          include: [
            {
              model: User,
              attributes: ["id"],
              as: "profesorAsignado",
              include: [
                {
                  model: dataUser,
                  attributes: ["firstName", "lastName"],
                  as: "datosPersonales",
                },
              ],
            },
          ],
        },
      ],
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
    const registroN = req.body;
    let result = await materiaProfesor.create(registroN, {
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
    let result = await materiaProfesor.update(registroU, {
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
    let result = await materiaProfesor.update(registro, {
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
    const egistro = req.body;
    let result = await materiaProfesor.update(registro, {
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
