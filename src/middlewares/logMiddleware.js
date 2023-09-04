const fs = require("fs");

const logMiddleware = (req, res, next) => {
  fs.appendFileSync("log.txt", "Se ingreso en la pagina " + req.url + "\n");
  next();
};

module.exports = logMiddleware;
