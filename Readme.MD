# CRUD - CLASE 28

> Importante: En la branch **express-validator** se encuentra el proyecto con la aplicación de validación de campos

1. bajarme la aplicacion del playground
2. npm install
3. una vez levantado el proyecto comentar las lineas en product.js y en main.js

## consignas:

## modificar el home:

1. ir a mainController.js -> editar la ruta index, para mostrar index.ejs
2. ir a routes -> main.js .-> modificar router.get cambiar ??? por get
3. como no se ven los productos tengo que leer el json y pasarlo a javascript (esto ya esta hecho en el archivo)
4. envio los productos dentro de un objeto
   `index: (req, res) => {
  res.render("index", { products });
},`
5. modifico el ejs para que se muestren los productos: - hago un map para iterar:

```js
   <% products.map(product => {%>
      <a href="/products/detail/<%= product.id %>">
   <% }) %>
```

6. buscar la ruta:
   en routes -> product.js

/**_ GET ONE PRODUCT _**/

```js
// tenemos la ruta
router.???('/:id/', productsController.detail); cambiar por get. saco la barra al final del id
// queda:
router.get("/detail/:id", productsController.detail);
```

en controllers -> productController.js

--- buscar products.Controller.detail

en detail: traer el parametro dinamico: const id = req.params.id
luego tengo que filtrar el products:

```js
detail: (req, res) => {
// Do the magic
const id = req.params.id;
const product = products.find((product) => product.id == id);
res.render("detail", { product, toThousand });
},
```

como en el ejs no esta pasando el parametro cambiar en index.ejs:

```html
<a href="/products/detail/<%= product.id %>"></a>
```

en detail.ejs -> cambiar los detalles del producto por el que corresponde

chequear en el documento los requisitos:

-- Pestaña del navegador con el nombre del producto. aca buscar el partial y pasarle por parametro el nombre del producto:

```html
<%- include('partials/head', {title: product.name}) %>
<!-- Si el producto no tiene descuento, mostrar solo el precio real. una opcion:  -->
<% if(product.discount) {%> $<%= product.price - (product.price
*product.discount/100) %> <% } else { %> <%= product.price%> <% } %>
```

otra opcion:

```html
<%= product.discount ? ('$' + (product.price - (product.price _ product.discount
/ 100))) : ('$' + product.price) %> $<%= product.discount ? (product.price -
(product.price \_ product.discount/100)) : (product.price)%>
```

-- Los precios deberán mostrarse con separador de miles.
paso como parametro la funcion toThousand:

```js
res.render("detail", { product, toThousand });
```

luego aplico al price dentro de: <%= %>

-- En la sección de Detalle de producto se deberá incluir los dos botones de acción para cada producto: MODIFICAR y BORRAR.

1- en products.js -> modificar las rutas:

```js
router.get("/:id/???", productsController.edit); // get
router.put("/:id", productsController.update); // put -- todavia no
```

2- en detail.ejs:

```html
<a href="/products/edit/<%= product.id %>" class="action-button edit"
  >EDITAR PRODUCTO</a
>
```

3- en productsController:

```js
edit: (req, res) => {
const id = req.params.id;
const product = products.find((product) => product.id == id); // uso lo que utilice arriba
res.render("product-edit-form",{productToEdit: product}); // importante aca lo que busca la vista es algo que se llama productToEdit!!
},
```

4- en product-edit-form.ejs: cambiar los ejemplos y poner <%= productToEdit.name %> importante que sea productToEdit

-- seguimos chequeando el formulario:
// La aplicación deberá contar con las 7 rutas de un ABM:
// Listado de productos.
// Formulario de carga.Formulario para poder cargar productos:
// Recepción del formulario de carga.
// Formulario de edición.
// Recepción del formulario de edición.
// Eliminación de productos.
// Para las rutas de recepción de formularios y borrado, nos solicitan que simplemente mostremos, por ahora, un mensaje de la acción.

// Listado de productos.

1. editar /**_ GET ALL PRODUCTS _**/

```js
router.get("/", productsController.index);
```

2. ir a productsController y editar el metodo index:

```js
   index: (req, res) => {
   res.render("products", { products }); // cambiar a products
   },
```

copiar lo de index que esta en mainController!!!!

// Formulario de carga.Formulario para poder cargar productos:
en products.js

// /**_ CREATE ONE PRODUCT _**/

```js
router.get("/create", productsController.create); // es solo create
```

en productController

```js
create: (req, res) => {
// Do the magic
res.render("product-create-form");
},
```

// Recepción del formulario de carga. chequear en product-create-form:

```html
<form action="¿?" method="___"></form>
<!-- cambiar a: -->
<form action="/products" method="post"></form>
```

en // /**_ CREATE ONE PRODUCT _**/

```js
router.get("/create", productsController.create);
// router.???('/', productsController.store); --> cambiar esto:
router.post("/", productsController.store);
```

en productsController.js:

```js
store: (req, res) => {
// Do the magic
res.send("formulario recibido");
},
```

// Recepción del formulario de edición.
editar en product-edit-form cambiar esto: decir que veremos luego lo del metodo put

```html
<form action="/products/edit/<%= productToEdit.name %>" method="POST"></form>
```

// Eliminación de productos.
buscar el boton de eliminacion en detail:
cambiar:

```html
<form
  action="/products/delete/<%= product.id %>"
  method="POST"
  style="display: inline-flex"
></form>
```

buscar en products.js
/**_ DELETE ONE PRODUCT_**/

```js
router.post("/delete/:id", productsController.destroy);
```

# CRUD - CLASE 29

Para poder recibir la data del body, tengo que tener en app.js las siguientes lineas, para poder recibir datos en el body:

```js
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
```

## Creación de productos:

1. Modificación del método de creación de productos:
   Tener el cuenta que en el archivo .ejs, esté la ruta y el metodo post:

```html
<form action="/products/create" method="post"></form>
```

2. En el controlador:

```js
store: (req, res) => {
  // Guardar el producto creado por el usuario
  const data = req.body;

  // Pasos para guardar un producto:

  // 1. Traer la información de productos
  // ya traigo esta info de products:
  // const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

  // 2. Crear el objeto literal a guardar
  const newProduct = {
    id: products[products.length - 1].id + 1, // creo un id a partir del id anterior
    name: data.name,
    price: data.price,
    discount: data.discount,
    category: data.category,
    description: data.description,
    image: "default-image.png",
  };
  // otra forma de hacer lo mismo:
  const lastProductId = products[products.length - 1].id;
  const newProduct = {
    id: lastProductId + 1,
    ...data,
    image: "default-image.png",
  };

  // 3. Guardarlo en el array de objetos

  products.push(newProduct);

  // 4. Escribir el archivo
  fs.writeFileSync(productsFilePath, JSON.stringify(products), null, 2);

  // 5. Redireccionar al usuario alguna información

  res.redirect("/"); // redireccionar a index
};
```

## Eliminación de productos:

1. Buscar en el formulario de eliminación que las rutas esten correctas:
   Archivo detail.js
   ```html
   <form
     action="/products/delete/<%= product.id %>"
     method="POST"
     style="display: inline-flex"
   >
     <button type="submit" class="action-button delete">ELIMINAR</button>
   </form>
   ```
2. Buscar las rutas de eliminación:

   ```js
   // /*** DELETE ONE PRODUCT***/
   router.post("/delete/:id", productsController.destroy);
   ```

3. Modificar el controlador:
   Buscar el controlador, en este caso productsController.destroy:

   ```js
   // Delete - Delete one product from DB
   destroy: (req, res) => {
      // Para borrar un producto:
      // 1. Extraer el producto a eliminar del req.params.id
      const id = req.params.id;

      // 2. Filtrar el array de productos para que queden todos menos el producto eliminado
      const LeftProducts = products.filter((product) => product.id != id);

      // 3. Escribir el archivo
      fs.writeFileSync(productsFilePath, JSON.stringify(LeftProducts), null, " ");

      // 4. Redireccionar:
      res.redirect("/");
   },
   ```

   ## Edición de productos:

   1. Chequear que este la ruta correcta en el ejs.

   ```html
   <form action="/products/edit/<%= productToEdit.id %>" method="post"></form>
   ```

   2. Chequear las rutas:
      Hay que tener en cuenta que todavia no vamos a utilizar put ni delete.
      ```js
      // /*** EDIT ONE PRODUCT ***/
      router.get("/edit/:id", productsController.edit);
      router.post("/edit/:id", productsController.update);
      ```
   3. Controladores:
      El método get, muestra el formulario con la información para editar:

      ```js
      // Update - Form to edit
      edit: (req, res) => {
      const id = req.params.id;
      const product = products.find((product) => product.id == id);
      res.render("product-edit-form", { productToEdit: product });
      },
      ```

   4. Editar un producto por post:

   ```js
      update: (req, res) => {
      // Modificar el producto

      // 1. Guardar la información modificada que llega en el body, y el id del producto que llega en el params
      const editProduct = req.body;
      const id = req.params.id;
      //2. Buscar el indice del array del producto
      const idProd = products.findIndex((product) => product.id == id);
      //3. Modificar el producto con ese indice:
      if (idProd !== -1) {
         products[idProd].name = editProduct.name;
         products[idProd].price = editProduct.price;
         products[idProd].discount = editProduct.discount;
         products[idProd].category = editProduct.category;
         products[idProd].description = editProduct.description;

         // 4. escribir en disco el nuevo arreglo:
         fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8");

         // Redireccionar a la página de inicio u otra página según tu flujo
         res.redirect("/");
      } else {
         // Si no se encuentra el producto, puedes manejar el error de alguna forma
         res.status(404).send("Producto no encontrado");
      }
   },
   ```

# Subir imagenes con Multer

1. Primer debemos instalar multer:
   `npm install multer`
2. En el archivo de rutas, en nuestro caso routes/product.js debemos configurar multer. Esto es así porque vamos a subir imagenes del producto:

```js
const multer = require("multer");
```

3.  Configurar el storage donde vamos a guardar las imagenes:
    > La función diskStorage tiene dos metodos: destination y filename:
    > destination recibe 3 parametros: req, file y cb. cb es un callback que a su vez recibe 2 parametros, el primero siempre es null, el segundo es el lugar donde se van a guardar las imagenes.
    >
    > filename recibe 3 parametros: req, file y cb. cb es un callback que a su vez recibe 2 parametros, el primero siempre es null,el segundo es el nombre que le vamos a dar al archivo, en este caso la imagen al guardarla.
    > la configuracion espera la palabra user, la fecha de hoy y la extracción de la extensión del archivo.

```js
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, cb(null, "./public/images/products"));
  },
  filename: (req, file, cb) => {
    const newFilename = `user_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, newFilename);
  },
});
```

en este punto, si no esta requerida la libreria path, hay que requerirla:
`const path = require("path")`

4. Definir la variable que servirá como middleware:

   > Luego debemos decirle a multer que utilice la variable anterior como almacenamiento.

   ```js
   const uploadFile = multer({ storage });
   ```

5. Utilización:
   En el formulario donde queremos cargar imagenes tenemos que agregar enctype:

   ```html
   <form
     action="/alguna-ruta"
     method="POST"
     enctype="multipart/form-data"
   ></form>
   ```

   dentro de los input, le agregamos un input mas:

   ```html
   <div class="col-12">
     <label for="foto" class="form-label">Foto:</label>
     <input type="file" name="productImage" id="foto" />
   </div>
   ```

6. Implementar Multer como middleware:

   > En el controlador, donde se procesa el formulario de upload, debemos pasarle como parámetro la variable creada en el paso anterior, que recibe como parámetro el name que pusimos en el formulario:

   ```js
   router.post(
     "/register",
     uploadFile.single("productImage"),
     usersController.create
   );
   ```

   > en medio del nombre de la ruta y el método del controlador, traemos a la variable definida en el punto anterior. Y sobre la misma estamos ejecutando el método single(), el cual toma como argumento el nombre de input que enviará la imagen que deseamos procesar.

7. Guardar la imagen
   Me llega la información de la imagen en el objeto req.file que puedo consologuear.
   De req.file tomo el nombre de la nueva imagen que ya va a estar cargada en nuestro disco.

```js
store: (req, res) => {
   // Do the magic
   const data = req.body;

   const index = products[products.length - 1].id;

   const newProduct = {
     id: index + 1,
     name: data.name,
     price: data.price,
     discount: data.discount,
     category: data.category,
     description: data.description,
     image: req.file.filename, // esta es la imagen que se carga a traves de multer
   };
   products.push(newProduct);
   fs.writeFileSync(productsFilePath, JSON.stringify(products));

   res.redirect("/");
 },
```
