const express = require("express");
const { userController } = require("../controller/users");
const { profileController } = require("../controller/profiles");
const auth = require("../middlewares/authentication");
const profile = require("../../models/profile");
const { productController } = require("../controller/products");
const { categoriesController } = require("../controller/categories");
const { typeController } = require("../controller/type");
const route = express.Router();

// product
route.get("/products", productController.getAll);
route.post("/products", productController.create);
route.get("/products/:id", productController.getDetail);
route.delete("/products/:id", productController.deleteProduct);
route.post("/products/:id", productController.updateDataProduct);
// type
route.get("/type", typeController.create);
// categories
route.get("/categories", categoriesController.getAll);
route.post("/categories", categoriesController.create);
route.post("/categories/product", categoriesController.addCategoryToProduct);
// user
route.post("/register", userController.register);
route.post("/login", userController.logIn);
// profile
route.post("/profile", profileController.createProfile);
route.get("/profile/:id", auth, profileController.getProfile);


module.exports = route