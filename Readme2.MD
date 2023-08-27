## Instalacion de multer:

1. npm install multer

2. Requerir multer:

   > Requerimos multer en el archivo de rutas donde lo vamos a utilizar

   ```js
   const multer = require("multer");
   ```

3. Utilización:
   En el formulario donde queremos cargar imagenes tenemos que agregar enctype:

   ```html
   <form
     action="/alguna-ruta"
     method="POST"
     enctype="multipart/form-data"
   ></form>
   ```

   dentro de los input:

   ```html
   <input type="file" name="imagenUsuario" />
   ```

4. Configuración del disco de almacenamiento de multer: (Dentro del archivo de rutas)

   > destination: se pasa tres argumentos, req, file y un callback, al callback le pasamos 2 parámetros: el primero que tiene que ser null y el segundo que es la carpeta donde almacenaremos el archivo.
   > filename: tiene los mismos parámetros, en donde el callback recibe tambien 2 parámetros, el primero es null, el segundo el nombre que queremos que tenga el archivo.
   > en este caso el nombre lo armamos, con la función Date que nos dará un numero, y extraemos la extensión original del archivo.

   ```js
   const storage = multer.diskStorage({
     destination: (req, file, cb) => {
         cb(null, path.join(__dirname,'../public/images/usuarios'));
     },
     filename: (req, file, cb) => {
         const newFilename = "`user-${Date.now()}${path.extname(file.originalname)}`",
         cb(null, newFilename);  }
     })
   ```

5. Definir la variable que servirá como middleware:

   > Luego debemos decirle a multer que utilice la variable anterior como almacenamiento.

   ```js
   const uploadFile = multer({ storage });
   ```

6. Implementar Multer como middleware:

   > Eb ek controlador, donde se procesa el formulario de upload, debemos pasarle como parámetro la variable creada en el paso anterior, que recibe como parámetro el name que pusimos en el formulario:

   ```js
   router.post(
     "/register",
     uploadFile.single("imagenUsuario"),
     usersController.create
   );
   ```

   > en medio del nombre de la ruta y el método del controlador, traemos a la variable definida en el punto anterior. Y sobre la misma estamos ejecutando el método single(), el cual toma como argumento el nombre de input que enviará la imagen que deseamos procesar.
