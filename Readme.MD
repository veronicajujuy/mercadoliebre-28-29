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
   <% products.map(product => {%>
   <% }) %>
   OJO ACÁ NO HAY QUE PONER SOLO () HAY QUE PONER {}
   rutas
   CAMBIAR: <a href="/products/detail/<%= product.id %>">
   /products/:id

6. buscar la ruta:
   en routes -> product.js

/**_ GET ONE PRODUCT _**/
router.???('/:id/', productsController.detail); cambiar por get. saco la barra al final del id
queda:
router.get("/detail/:id", productsController.detail);

en controllers -> productController.js

--- buscar products.Controller.detail

en detail: traer el parametro dinamico: const id = req.params.id
luego tengo que filtrar el products:

detail: (req, res) => {
// Do the magic
const id = req.params.id;
const product = products.find((product) => product.id == id);
res.render("detail", { product, toThousand });
},

como en el ejs no esta pasando el parametro cambiar en index.ejs:
<a href="/products/detail/<%= product.id %>">

en detail.ejs -> cambiar los detalles del producto por el que corresponde

chequear en el documento los requisitos:

-- Pestaña del navegador con el nombre del producto. aca buscar el partial y pasarle por parametro el nombre del producto:
<%- include('partials/head', {title: product.name}) %> poner sin <%=
-- Si el producto no tiene descuento, mostrar solo el precio real.
una opcion:
<% if (product.discount) {%>
$<%= product.price - (product.price * product.discount/100) %> 
<% } else { %> 
	<%= product.price%> 
<% } %>
otra opcion:
<%= product.discount ? ('$' + (product.price - (product.price _ product.discount / 100))) : ('$' + product.price) %>
$<%= product.discount ? (product.price - (product.price _ product.discount/100)) : (product.price)%>

-- Los precios deberán mostrarse con separador de miles.
paso como parametro la funcion toThousand: res.render("detail", { product, toThousand });
luego aplico al price dentro de: <%= %>

-- En la sección de Detalle de producto se deberá incluir los dos botones de acción para cada producto: MODIFICAR y BORRAR.

1- en products.js -> modificar las rutas:
router.get("/:id/???", productsController.edit); // get
router.put("/:id", productsController.update); // put -- todavia no
2- en detail.ejs:
<a href="/products/edit/<%= product.id %>" // aca poner product.id
class="action-button edit" >EDITAR PRODUCTO</a>
3- en productsController:
edit: (req, res) => {
const id = req.params.id;
const product = products.find((product) => product.id == id); // uso lo que utilice arriba
res.render("product-edit-form",{productToEdit: product}); // importante aca lo que busca la vista es algo que se llama productToEdit!!
},
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
   router.get("/", productsController.index);
2. ir a productsController y editar el metodo index:
   index: (req, res) => {
   res.render("products", { products }); // cambiar a products
   },
   copiar lo de index que esta en mainController!!!!

// Formulario de carga.Formulario para poder cargar productos:
en products.js

// /**_ CREATE ONE PRODUCT _**/
router.get('/create', productsController.create); // es solo create
en productController
create: (req, res) => {
// Do the magic
res.render("product-create-form");
},
// Recepción del formulario de carga. chequear en product-create-form: <form action="¿?" method="___">
cambiar a: <form action="/products" method="post">

en // /**_ CREATE ONE PRODUCT _**/
router.get("/create", productsController.create);
// router.???('/', productsController.store); --> cambiar esto:
router.post("/", productsController.store);

en productsController.js:
store: (req, res) => {
// Do the magic
res.send("formulario recibido");
},

// Recepción del formulario de edición.
editar en product-edit-form cambiar esto: decir que veremos luego lo del metodo put

<form action="/products/edit/<%= productToEdit.name %>" method="POST">

// Eliminación de productos.
buscar el boton de eliminacion en detail:
cambiar:

<form action="/products/delete/<%= product.id %>"
                method="POST"
                style="display: inline-flex"
              >
buscar en products.js
/*** DELETE ONE PRODUCT***/
router.post("/delete/:id", productsController.destroy);
