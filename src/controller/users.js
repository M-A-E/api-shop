const { user } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        const schema = joi.object({
            firstName: joi.string().min(3).max(20).required(),
            lastName: joi.string().min(3).max(20).required(),
            email: joi.string().email().min(3).max(20).required(),
            password: joi.string().min(8).pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[\\W_]).{8,}$')).required(),
        });
        const { error } = await schema.validateAsync(req.body);
        if (error) {
            return res.status(400).send({
                statusCode: 400,
                status: "fail",
                message: error.details[0].message
            });
        }
        const findUser = await user.findOne({
            where: { email }
        });
        if (findUser) {
            return res.status(400).send({
                statusCode: 400,
                status: "fail",
                message: "Email has been registered!"
            });
        }
        const saltRounds = 15;
        const encrypPassword = bcrypt.hashSync(password, saltRounds);
        const response = await user.create({
            firstName,
            lastName,
            email,
            password: encrypPassword
        });
        res.status(200).send({
            statusCode: 200,
            status: "success",
            message: "Register success",
            data: response
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            status: "error",
            message: error.message
        });
    }
};

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const schema = joi.object({
            email: joi.string().email().min(3).max(20).required(),
            password: joi.string().required(),
        });
        const { error } = await schema.validateAsync(req.body);
        if (error) {
            return res.status(400).send({
                statusCode: 400,
                status: "fail",
                message: error.details[0].message
            });
        }
        const findUser = await user.findOne({
            where: { email }
        });
        if (!findUser) {
            return res.status(400).send({
                statusCode: 400,
                status: "fail",
                message: "Account not found."
            });
        }
        const valid = bcrypt.compareSync(password, findUser.password);
        if (!valid) {
            return res.status(400).send({
                statusCode: 400,
                status: "fail",
                message: "Incorrect password"
            });
        }
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign({ id: findUser.id }, secretKey);
        res.status(200).send({
            statusCode: 200,
            status: "success",
            message: "Log-in success",
            data: {
                token
            }
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            status: "error",
            message: error.message
        });
    }
};

exports.userController = {
    register,
    logIn
};
