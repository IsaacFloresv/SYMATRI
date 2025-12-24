const { logs } = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    // page y pageSize pueden venir del frontend
    const page = parseInt(req.query.page) || 1;       // página actual
    const pageSize = parseInt(req.query.pageSize) || 10; // registros por página

    let result = await logs.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [['createdAt', 'DESC']], // opcional: ordenar resultados
      attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
      include: [{
        association: "usuario",
        attributes: ["id"],
        include: [{
          association: "datosPersonales",
          attributes: ["firstName", "lastName"]
        }]
      }],
    });
    res.json(
      {
        total: result.count,             // total de registros
        totalPages: Math.ceil(result.count / pageSize),
        currentPage: page,
        data: result.rows                // registros de la página actual
      }
    );
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
    let result = await logs.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
      include: [{
        association: "usuario",
        attributes: ["id"],
        include: [{
          association: "datosPersonales",
          attributes: ["firstName", "lastName"]
        }]
      }],
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
    console.log(registroN);
    let result = await logs.create(registroN, {
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

module.exports = {
  getAll,
  getById,
  create
};
