const { profile } = require("../../models");
const joi = require("joi");

const createProfile = async (req, res) => {
    try {
        const {
            name,
            dateOfBirth,
            email,
            address,
            phoneNumber,
            religion
        } = req.body;
        const schema = joi.object({
            name: joi.string().min(3).max(50).required(),
            dateOfBirth: joi.date().iso().required(),
            email: joi.string().email().min(3).max(50).required(),
            address: joi.string().min(5).max(1000).required(),
            phoneNumber: joi.string().min(10).max(15).required(),
            religion: joi.string().min(3).max(20).required(),
        });
        const { error } = await schema.validateAsync(req.body);
        if (error) {
            return res.status(400).send({
                statusCode: 400,
                status: "fail",
                message: error.details[0].message
            });
        }
        const response = await profile.create({
            name,
            dateOfBirth,
            email,
            address,
            phoneNumber,
            religion
        });
        res.status(200).send({
            statusCode: 200,
            status: "success",
            message: "Profile has been successfully created",
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

const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const findOne = await profile.findByPk(id);
        if (!findOne) {
            return res.status(400).send({
                statusCode: 400,
                status: "fail",
                message: "Profile not found!"
            });
        }
        res.status(200).send({
            statusCode: 200,
            status: "success",
            message: "Get profile success",
            data: findOne
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            status: "error",
            message: error.message
        });
    }
}

exports.profileController = {
    createProfile,
    getProfile
};