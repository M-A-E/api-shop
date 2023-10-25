const express = require("express");
const { userController } = require("../controller/users");
const { profileController } = require("../controller/profiles");
const auth = require("../middlewares/authentication");
const profile = require("../../models/profile");
const route = express.Router();
// user
route.post("/register", userController.register);
route.post("/login", userController.logIn);
// profile
route.post("/profile/created", profileController.createProfile);
route.get("/profile/:id", auth, profileController.getProfile);


module.exports = route