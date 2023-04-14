"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.Order, { foreignKey: "orderId" });
      Address.hasMany(models.Cart, { foreignKey: "addressId" });
      Address.belongsTo(models.Customer, { foreignKey: "cusId" });
    }
  }
  Address.init(
    {
      fullname: DataTypes.STRING,
      phone: DataTypes.STRING,
      orderId: DataTypes.INTEGER,
      custId: DataTypes.INTEGER,
      discrict: DataTypes.STRING,
      city: DataTypes.STRING,
      states: DataTypes.STRING,
      area: DataTypes.STRING,
      shipping: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
