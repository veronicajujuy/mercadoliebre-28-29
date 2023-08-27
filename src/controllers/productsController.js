const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    // Do the magic

    res.render("products", { products });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    // Do the magic
    const id = req.params.id;
    const product = products.find((product) => product.id == id);
    res.render("detail", { product, toThousand });
  },

  // Create - Form to create
  create: (req, res) => {
    // Do the magic
    res.render("product-create-form");
  },

  // Create -  Method to store
  store: (req, res) => {
    // Do the magic
    res.send("formulario recibido");
  },

  // Update - Form to edit
  edit: (req, res) => {
    const id = req.params.id;
    const product = products.find((product) => product.id == id);
    res.render("product-edit-form", { productToEdit: product });
  },
  // Update - Method to update
  update: (req, res) => {
    // Do the magic
    const id = req.params.id;
    res.send("formulario recibido del update" + id);
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    // Do the magic
    const id = req.params.id;
    const product = products.find((product) => product.id == id);
    res.send("aca se borrara el producto: " + product.name);
  },
};

module.exports = controller;
