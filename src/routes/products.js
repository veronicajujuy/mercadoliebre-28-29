// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const productsController = require("../controllers/productsController");

// La aplicación deberá contar con las 7 rutas de un ABM:
// Listado de productos. check
// Formulario de carga. Formulario para poder cargar productos: check
// Recepción del formulario de carga. check
// Formulario de edición. check
// Recepción del formulario de edición. check
// Eliminación de productos.
// Para las rutas de recepción de formularios y borrado, nos solicitan que simplemente mostremos, por ahora, un mensaje de la acción.

/*** GET ALL PRODUCTS ***/
router.get("/", productsController.index);

// /*** CREATE ONE PRODUCT ***/
router.get("/create", productsController.create);
router.post("/", productsController.store);

/*** GET ONE PRODUCT ***/
router.get("/detail/:id", productsController.detail);

// /*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", productsController.edit);
router.post("/edit/:id", productsController.update);

// /*** DELETE ONE PRODUCT***/
router.post("/delete/:id", productsController.destroy);

module.exports = router;
