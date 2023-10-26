const { product } = require("../../models");

const getAll = async(req, res) => {
    try {
        const getData = await product.findAll();
        res.status(200).send({
            statusCode: 200,
            status: "success",
            message: "get all data product success",
            data: getData
        })
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
        const {
            name,
            stock,
            description,
            status
          } = req.body;
          const response = await product.create({
            name,
            stock,
            description,
            status: true
          });
          res.status(200).send({
            statusCode: 200,
            status: "success",
            message: "create product success",
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

const getDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const findOne = await product.findOne({
            where: { id: id }
        })
        if (!findOne) {
            return res.status(400),send({
                statusCode: 400,
                sattus: "failed",
                message: "product not found"
            })
        }
        res.status(200).send({
            statusCode : 200,
            status: "success",
            message: "product found",
            data: findOne
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            status: "error",
            message: error.message
        })
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const findOne  = await product.findOne({
            where: { id: id }
        });
        if (!findOne) {
            return res.status(400).send({
                statusCode: 400,
                status: "fail",
                message: "failed, id not found"
            })
        };
        const destroyProduct = await product.destroy({
            where: { id: id }
        });
        res.status(200).send({
            statusCode: 200,
            status: "success",
            message: `delete product ${findOne.name} success`,
            data: destroyProduct
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            status: "error",
            message: error.message
        })
    }
};

const updateDataProduct = async (req, res) => {
    try {
        const { id } = req.params
        const {
            name,
            stock,
            description,
            status
          } = req.body;
          const findOne = await product.findOne({
            where: {id: id}
          })
          if (!findOne) {
            return res.status(400).send({
                statusCode: 200,
                status: "fail",
                message: "product not found"
            })
          }
          const upData = await product.update(
            {
            name,
            stock,
            description,
            status
            },
            {
                where: {id: id}
            }
          );
          res.status(200).send({
            sattusCode: 200,
            status: "success",
            message: "update data product success",
            data: upData
          })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            status: "error",
            message: error.message
        })
    }
};

exports.productController = {
    getAll,
    create,
    getDetail,
    deleteProduct,
    updateDataProduct
}