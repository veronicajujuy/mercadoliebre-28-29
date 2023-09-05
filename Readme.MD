## USO DE EXPRESS-VALIDATOR

1. Instalacion:

   `npm i express-validator`

importante: chequear que este este middleware para ver que efectivamente se pueda recibir información por post:

`app.use(express.urlencoded({ extended: false }));`

2. Uso:
   En el archivo de rutas:
   Voy a requerir el metodo body de express-validator (podria requerir check tambien):

```js
const { body } = require("express-validator");
```

luego tengo que agregar una nueva variable donde se guardaran las validaciones:
y por cada uno de los campos agregar la validación necesaria

```js
const validations = [
  body("nombreyapellido")
    .notEmpty()
    .withMessage("Este campo no puede quedar en blanco"),
  body("fecha-nacimiento")
    .notEmpty()
    .withMessage("Este campo no puede quedar en blanco"),
  body("personajes")
    .notEmpty()
    .withMessage("Este campo no puede quedar en blanco"),
  body("password")
    .notEmpty()
    .withMessage("Este campo no puede quedar en blanco"),
  body("confirm-password")
    .notEmpty()
    .withMessage("Este campo no puede quedar en blanco"),
];
```

y luego pasarle como middleware al controlador de la ruta de POST:

```js
userRouter.post(
  "/registro",
  uploadFile.single("foto"),
  validations, // este es el middleware
  usersController.processRegistro
);
```

En el archivo de controladores:

debemos requerir el metodo validationResult:

```js
const { validationResult } = require("express-validator");
```

Para mostrar los errores:

    a. En la variable resultValidation voy a guardar el resultado del objeto validationResult que le paso lo que viene por req.
    b. Luego cheque si esta variable en su propiedad errors tiene algo (el if)
    c. Vuelvo a enviar la vista, en este caso registro con el objeto resultValidation.mapped() que convierte los errores en objetos literales

```js
processRegistro: (req, res) => {
const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      res.render("registro", {
        errors: resultValidation.mapped(),
      });
    }

},
```

En el ejs:

Debo chequear que la variable errors existe (existirá recien cuando se haga la primera iteracion de validacion) y luego si existe el error para ese campo:
Esto debo hacer para cada campo que estoy validando:

primero debo chequear que exista la variable errors (la primera vez que se accede no va a existir la variable errors, x eso hago este chequeo..)
y luego chequeo que exista el error para el campo. Luego muestro la propiedad msg del campo.

```html
<% if (locals.errors && errors.fechanacimiento) { %>
<p class="errors"><%= errors.fechanacimiento.msg %></p>
<% } %>
```

Para que cada vez que volvamos a la pagina y no se pierda la información que agregamos debemos poner las siguientes lineas:

```html
<input type="date" name="fechanacimiento"
value="<%=locals.oldData?oldData.fechanacimiento:null %>" id="fecha-nacimiento"
class="<%=(locals.errors && errors.fechanacimiento)?"isinvalid": null %> " />
```
