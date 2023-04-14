"use strict";
const { Model } = require("sequelize");
const vendor = require("./vendor");
module.exports = (sequelize, DataTypes) => {
  class Vendor_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vendor_product.belongsTo(models.Product, { foreignKey: "productId" });
      Vendor_product.belongsTo(models.Vendor, { foreignKey: "supplierId" });
    }
  }
  Vendor_product.init(
    {
      supplierId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      unitSize: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Vendor_product",
    }
  );
  return Vendor_product;
};
