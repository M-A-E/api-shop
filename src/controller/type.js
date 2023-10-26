const { type } = require("../../models");

const create = async (req, res) => {
    try {
        const { id }  = req.params;
        const { name, type } = req.body;
        const response = await type.create({
            name,
            type,
            productId: id
        })
        res.status(200).send({
            statusCode: 200,
            status: "success",
            message: "create type success",
            data: response
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            status: "error",
            message: error.massage
        })
    }
};

exports.typeController = {
    create
}