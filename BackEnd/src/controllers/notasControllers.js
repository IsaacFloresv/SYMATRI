const { notas, user, dataUser, materias, tipoNotas } = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    let Notas = await notas.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: materias,
          attributes: ["name"],
          as: "materia",          
        },
        {
          model: tipoNotas,
          attributes: ["id", "nombre"],
          as: "tipoNota",
        },
       {
          model: user,
          attributes: ["id"],
          as: "alumnoNota",
          include: [
       {
          model: dataUser,
          attributes: ["firstName", "lastName"],
          as: "datosPersonales",
        },
      ],
        },
        {
          model: user,
          attributes: ["id"],
          as: "autor",
          include: [
       {
          model: dataUser,
          attributes: ["firstName", "lastName"],
          as: "datosPersonales",
        },
      ],
        }
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
      where: {id},
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: materias,
          attributes: ["name"],
          as: "materia",          
        },
        {
          model: tipoNotas,
          attributes: ["id", "nombre"],
          as: "tipoNota",
        },
       {
          model: user,
          attributes: ["id"],
          as: "alumnoNota",
          include: [
       {
          model: dataUser,
          attributes: ["firstName", "lastName"],
          as: "datosPersonales",
        },
      ],
        },
        {
          model: user,
          attributes: ["id"],
          as: "autor",
          include: [
       {
          model: dataUser,
          attributes: ["firstName", "lastName"],
          as: "datosPersonales",
        },
      ],
        }
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

const getByAlumnoId = async (req, res) => {
  try {
    const { id, alumnoId } = req.body;
    let Nota = await notas.findOne({
      where: {id, alumnoId},
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: materias,
          attributes: ["name"],
          as: "materia",          
        },
        {
          model: tipoNotas,
          attributes: ["id", "nombre"],
          as: "tipoNota",
        },
       {
          model: user,
          attributes: ["id"],
          as: "alumnoNota",
          include: [
       {
          model: dataUser,
          attributes: ["firstName", "lastName"],
          as: "datosPersonales",
        },
      ],
        },
        {
          model: user,
          attributes: ["id"],
          as: "autor",
          include: [
       {
          model: dataUser,
          attributes: ["firstName", "lastName"],
          as: "datosPersonales",
        },
      ],
        }
      ],
    });

    if(!Nota) res.status(404).json({message:"No existe el registro solicitado"});
    res.json(Nota);
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

    const ensureTipo = async (item) => {
      if (!item) return;
      if (item.tipoId) return; // already provided
      if (item.tipo) {
        // buscar o crear tipoNota
        const [t] = await tipoNotas.findOrCreate({ where: { nombre: item.tipo }, defaults: { descripcion: null } });
        item.tipoId = t.id;
        delete item.tipo;
      }
    };

    if (Array.isArray(registroN)) {
      await Promise.all(registroN.map(ensureTipo));
      const Nota = await notas.bulkCreate(registroN);
      return res.json(Nota);
    }

    await ensureTipo(registroN);
    const Nota = await notas.create(registroN);
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
    const registroU = req.body;

    if (registroU.tipo && !registroU.tipoId) {
      const tipo = await tipoNotas.findOne({ where: { nombre: registroU.tipo } });
      if (tipo) registroU.tipoId = tipo.id;
      delete registroU.tipo;
    }

    let Nota = await notas.update(registroU, {
      where: { id: registroU.id },
    });
    res.json(Nota);
  } catch (error) {
    console.log(error)
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
      fields: ["active"],
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
  getByAlumnoId,
  create,
  update,
  validate,
  deleteR,
};
