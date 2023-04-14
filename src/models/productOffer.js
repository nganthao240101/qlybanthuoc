"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductOffer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductOffer.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  ProductOffer.init(
    {
      productId: DataTypes.INTEGER,
      image: DataTypes.STRING,
      discount_per: DataTypes.STRING,
      discount_price: DataTypes.FLOAT,
      qty: DataTypes.INTEGER,
      total: DataTypes.FLOAT,
      net_price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "ProductOffer",
    }
  );
  return ProductOffer;
};
