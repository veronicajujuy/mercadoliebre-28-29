let admins = ["Ada", "Greta", "Vim", "Tim"];

const logAdmin = (req, res, next) => {
  // en la ruta debemos poner al final de la misma ?user=Ada o cualquier otro usuario de la lista
  //console.log(req.query);
  let user = req.query.user;
  if (user) {
    admins.forEach((admin) => {
      if (user == admin) {
        next();
      }
    });
  } else {
    res.send("no tienes los privilegios para ingresar");
  }
};

module.exports = logAdmin;
