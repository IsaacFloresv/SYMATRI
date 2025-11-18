const { horarios, User,dataUser, secciones, materiaProfesor, materias } = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    let result = await horarios.findAll({
      attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      include: [
        {
          model: secciones,
          attributes: { exclude: ["userId", "id", "createdAt", "updatedAt"] },
          as: 'seccion',
        },
        {
          model: User,
          attributes: ["id"],
          as: 'profesor',
          include: [
            {
              model: dataUser,
              attributes: { exclude: ["userId", "id", "createdAt", "updatedAt"] },
              as: 'datosPersonales',
            },
            {
              model: materiaProfesor,
              attributes: ["materiaId"],
              as: 'profesorAsignado',
              include: [
                {
                  model: materias,
                  attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                  as: 'materia',
                }
              ],
            }
          ]

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
    let result = await horarios.findOne({
      where: {id},
      attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      include: [
        {
          model: secciones,
          attributes: { exclude: ["userId", "id", "createdAt", "updatedAt"] },
          as: 'seccion',
        },
        {
          model: User,
          attributes: ["id"],
          as: 'profesor',
          include: [
            {
              model: dataUser,
              attributes: { exclude: ["userId", "id", "createdAt", "updatedAt"] },
              as: 'datosPersonales',
            },
            {
              model: materiaProfesor,
              attributes: ["materiaId"],
              as: 'profesorAsignado',
              include: [
                {
                  model: materias,
                  attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                  as: 'materia',
                }
              ],
            }
          ]

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
    let result = await horarios.create(registroN, {
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
    let result = await horarios.update(registroU, {
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
    let result = await horarios.update(registro, {
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
    let result = await horarios.update(registro, {
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
