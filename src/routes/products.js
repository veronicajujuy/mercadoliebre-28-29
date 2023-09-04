// ************ Require's ************
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// ************ Controller Require ************
const productsController = require("../controllers/productsController");
const logAdmin = require("../middlewares/admin");
// configuracion de multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/products");
  },
  filename: (req, file, cb) => {
    const nameFile = `products_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, nameFile);
  },
});

const uploadFile = multer({ storage });

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
router.get("/create", logAdmin, productsController.create);
router.post("/", uploadFile.single("productImage"), productsController.store);

/*** GET ONE PRODUCT ***/
router.get("/detail/:id", productsController.detail);

// /*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", logAdmin, productsController.edit);
router.post("/edit/:id", productsController.update);

// /*** DELETE ONE PRODUCT***/
router.post("/delete/:id", logAdmin, productsController.destroy);

module.exports = router;
