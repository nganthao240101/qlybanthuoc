"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Order, { foreignKey: "orderId" });
      Cart.belongsTo(models.Address, { foreignKey: "addressId" });
    }
  }
  Cart.init(
    {
      productId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      orderId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
