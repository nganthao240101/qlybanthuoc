"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.SubCategory, { foreignKey: "subCategoryId" });
      Product.hasMany(models.ProductPhoto, { foreignKey: "productId" });
      Product.belongsTo(models.SubChildCategory, {
        foreignKey: "childCategoryId",
      });
      Product.hasMany(models.Vendor_product, { foreignKey: "productId" });
    }
  }
  Product.init(
    {
      categoryId: DataTypes.INTEGER,
      subCategoryId: DataTypes.INTEGER,
      childCategoryId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      brand: DataTypes.STRING,
      batch: DataTypes.STRING,
      expiry: DataTypes.STRING,
      unit: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      status: DataTypes.STRING,
      // buyerPrice: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      // qty: DataTypes.INTEGER,
      discount: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      // netPrice: DataTypes.INTEGER,
      photo: DataTypes.STRING,
      description: DataTypes.STRING,
      // sortDesc: DataTypes.TEXT,
      // desc: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
