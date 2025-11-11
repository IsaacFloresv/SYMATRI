module.exports = {
  username: process.env.DB_USER || "dbprueba",
  password: process.env.DB_PASS || "123456",
  database: process.env.DB_DATABASE || "dbPrueba",
  host: process.env.DB_HOST || "127.0.0.1",
  dialect: process.env.DB_DIALECT || "mariadb",
  port: process.env.DB_PORT || "3306",
  aport: process.env.DB_APORT || "4321",
  token: process.env.APP_TOKEN || "M1s3cret0Nue5tro5ecret0",
};
