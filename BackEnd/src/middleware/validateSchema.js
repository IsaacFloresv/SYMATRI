// middlewares/validateSchema.js
const { ZodError } = require("zod");
const errorMessages = require("../errors/errorMessages");

function validateSchema(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body); // valida el body contra el schema
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: errorMessages.validationError,
          errors: err.errors.map(e => ({
            campo: e.path.join("."),
            error: e.message
          }))
        });
      }
      console.error(err);
      return res.status(500).json({ message: errorMessages.internalError });
    }
  };
}

module.exports = validateSchema;