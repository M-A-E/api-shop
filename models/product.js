'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product.hasMany(models, type, {
        as: "types",
        foreignKey: {
          name: "productId"
        }
      })

      product.belongsToMany(models.categories, {
        as: "category",
        through: {
          model: "productCategories",
          as: "conjuntion"
        }
      })
    }
  }
  product.init({
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};