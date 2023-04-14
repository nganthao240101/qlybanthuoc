"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.Address, { foreignKey: "orderId" });
      Order.hasMany(models.Cart, { foreignKey: "orderId" });
    }
  }
  Order.init(
    {
      orderDate: DataTypes.DATE,
      paymentMode: DataTypes.INTEGER,
      deliveryDate: DataTypes.DATE,
      amountPaid: DataTypes.STRING,
      discount: DataTypes.INTEGER,
      status: DataTypes.ENUM("processing", "shipping", "delieverd", "cancel"),
      comments: DataTypes.TEXT,
      customerId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
