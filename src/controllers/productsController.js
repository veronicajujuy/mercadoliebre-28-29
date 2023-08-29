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
    const data = req.body;

    const index = products[products.length - 1].id;

    const newProduct = {
      id: index + 1,
      name: data.name,
      price: data.price,
      discount: data.discount,
      category: data.category,
      description: data.description,
      image: req.file.filename,
    };
    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products));

    res.redirect("/");
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
    const editProduct = req.body;
    const index = products.findIndex((product) => product.id == id);

    products[index].name = editProduct.name;
    products[index].price = editProduct.price;
    products[index].discount = editProduct.discount;
    products[index].category = !editProduct.category
      ? products[index].category
      : editProduct.category;
    products[index].description = editProduct.description;

    fs.writeFileSync(productsFilePath, JSON.stringify(products));

    res.redirect("/");
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    // Do the magic
    const id = req.params.id;

    const leftProducts = products.filter((product) => product.id != id);
    fs.writeFileSync(productsFilePath, JSON.stringify(leftProducts));

    res.redirect("/");
  },
};

module.exports = controller;
