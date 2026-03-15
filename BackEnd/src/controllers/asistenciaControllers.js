const { actividades, asistencia, user, dataUser, materias } = require("../database/models/index");
const { Op } = require("sequelize");

const getAll = async (req, res) => {
  try {
    const { alumnoId, profesorId } = req.query;
    const where = {};
    if (alumnoId) {
      where.alumnoId = Number(alumnoId);
    }
    if (profesorId) {
      where.profesorId = Number(profesorId);
    }

    let result = await asistencia.findAll({
      where,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: user,
          attributes: ["id"],
          as: "alumnoAsistente",
          include: [
            {
              model: dataUser,
              attributes: ["firstName", "lastName"],
              as: "datosPersonales",
            },
          ],
        },
        {
          model: actividades,
          attributes: ["id", "name", "fechaInicio"],
          as: "actividad",
        },
      ],
    });

    res.json(result);
  } catch (error) {
    console.error('asistencia getAll error', error);
    res.json({
      message: "No fue posible obtener la informacion",
      error: error?.message || error,
      res: false,
    });
  }
};

const getAllById = async (req, res) => {
  try {
    const { alumnoId, materiaId } = req.query;
    const where = {};
    if (alumnoId) {
      where.alumnoId = Number(alumnoId);
    }

    const actividadInclude = {
      model: actividades,
      attributes: ["id", "name", "fechaInicio"],
      as: "actividad",
      include: [
        {
          model: user,
          as: "generador",
          attributes: ["id"],
          include: [
            {
              model: dataUser,
              attributes: ["firstName", "lastName"],
              as: "datosPersonales",
            },
          ],
        },
      ],
    };

    if (materiaId) {
      actividadInclude.where = {
        materiaId: Number(materiaId),
      };
      actividadInclude.required = true;
    }

    let result = await asistencia.findAll({
      where,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: user,
          attributes: ["id"],
          as: "alumnoAsistente",
          include: [
            {
              model: dataUser,
              attributes: ["firstName", "lastName"],
              as: "datosPersonales",
            },
          ],
        },
        actividadInclude,
      ],
    });

    res.json(result);
  } catch (error) {
    console.error('asistencia getAllById error', error);
    res.json({
      message: "No fue posible obtener la informacion",
      error: error?.message || error,
      res: false,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.query;
    let result = await actividades.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: user,
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
  getAllById,
  getById,
  create,
  update,
  validate,
  deleteR,
};
