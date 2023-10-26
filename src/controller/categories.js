const { categories, productCategories } = require("../../models");

const getAll = async (req, res) => {
    try {
        const getData = await categories.findAll();
        res.status(200).send({
            statusCode: 200,
            status: "success",
            message: "get data success",
            data: getData
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            status: "error",
            message: error.message
        })
    }
};

const create = async (req, res) => {
    try {
        const { name } = req.body;
        const response = await categories.create({
            name
        });
        res.status(200).send({
            statusCode: 200,
            status: "success",
            message: "create success",
            data: response
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            status: "error",
            message: error.message
        })
    }
};

const addCategoryToProduct = async (req, res) => {
    try {
        const {
            productId,
            categoryId
        } = req.body;
        const response = await productCategories.create({
            productId,
            categoryId
        });
        res.status(200).send({
            sattusCode: 200,
            status: "success",
            message: "add category to product success",
            data: response
        })

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            status: "error",
            message: error.message
        })
    }
};

exports.categoriesController = {
    getAll,
    create,
    addCategoryToProduct
}