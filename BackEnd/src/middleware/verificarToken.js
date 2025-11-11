const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  // Formato esperado: "Bearer eyJhbGciOi..."
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, 'CLAVE_SUPER_SECRETA', (err, user) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido o expirado' });
    }

    req.user = user; // El payload del token (ej. username, tipoUser)
    next();
  });
}