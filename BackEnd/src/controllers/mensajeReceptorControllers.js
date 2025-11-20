const { mensajeReceptors, User, dataUser } = require('@models/index');

// Obtener todos los registros
const getAll = async (req, res) => {
  try {
    const resultados = await mensajeReceptors.findAll({
    include: [
        {
          model: User,
          attributes: { exclude: ["id","userName", "pass", "active", "roleId", "createdAt", "updatedAt"] },
          as: "receptor",
          include: [
            {
              model: dataUser,
              attributes: { exclude: ["id","address","telefono","userId", "createdAt", "updatedAt"] },
              as: "datosPersonales",
            },
          ],
        }
      ],
    });
    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los registros', res: false });
  }
};

const getAllById = async (req, res) => {
  try {
    const { mensajeId } = req.body;
    const registro = await mensajeReceptors.findAll({
      where: { mensajeId },
    include: [
        {
          model: User,
          attributes: { exclude: ["id","userName", "pass", "active", "roleId", "createdAt", "updatedAt"] },
          as: "receptor",
          include: [
            {
              model: dataUser,
              attributes: { exclude: ["id","address","telefono","userId", "createdAt", "updatedAt"] },
              as: "datosPersonales",
            },
          ],
        }
      ],
    });

    if (registro) {
      res.json(registro);
    } else {
      res.status(404).json({ message: 'Registro no encontrado', res: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar el registro', res: false });
  }
};

// Obtener un registro por ID
const getById = async (req, res) => {
  try {
    const { id } = req.body;
    const registro = await mensajeReceptors.findByPk(id);

    if (registro) {
      res.json(registro);
    } else {
      res.status(404).json({ message: 'Registro no encontrado', res: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar el registro', res: false });
  }
};

// Crear registros para receptores de un mensaje
const create = async (req, res) => {
  try {
    const { mensajeId, receptorIds } = req.body;

    const registros = receptorIds.map((receptorId) => ({
      mensajeId,
      receptorId,
      leido: false,
      fechaLectura: null,
    }));

    const result = await mensajeReceptors.bulkCreate(registros);

    res.status(201).json({ message: 'Receptores registrados', res: true, result: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar receptores', res: false });
  }
};

// Marcar un mensaje como leído por un receptor
const update = async (req, res) => {
  try {
    const { mensajeId, receptorId } = req.body;

    const [updated] = await mensajeReceptors.update(
      { leido: true, fechaLectura: new Date() },
      {
        where: { mensajeId, receptorId },
      }
    );

    if (updated) {
      res.json({ message: 'Mensaje marcado como leído', res: true });
    } else {
      res.status(404).json({ message: 'Registro no encontrado', res: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar estado de lectura', res: false });
  }
};

module.exports = {  
  getAll,
  getAllById,
  getById,
  create,
  update,
};