const { mensaje_receptor } = require('@models/index');

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

    await mensaje_receptor.bulkCreate(registros);

    res.status(201).json({ message: 'Receptores registrados', res: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar receptores', res: false });
  }
};

// Marcar un mensaje como leído por un receptor
const update = async (req, res) => {
  try {
    const { mensajeId, receptorId } = req.body;

    const [updated] = await mensaje_receptor.update(
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

// Obtener todos los registros
const getAll = async (req, res) => {
  try {
    const resultados = await mensaje_receptor.findAll();
    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los registros', res: false });
  }
};

// Obtener un registro por ID
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await mensaje_receptor.findByPk(id);

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

module.exports = {
  create,
  update,
  getAll,
  getById,
};