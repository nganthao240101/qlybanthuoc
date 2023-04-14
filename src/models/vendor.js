"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vendor.belongsTo(models.Area, { foreignKey: "areaId" });
      Vendor.hasMany(models.Vendor_product, { foreignKey: "supplierId" });
    }
  }
  Vendor.init(
    {
      storename: DataTypes.STRING,
      status: DataTypes.INTEGER,
      shopaddress: DataTypes.TEXT,
      shopdesc: DataTypes.TEXT,
      ownername: DataTypes.STRING,
      owneraddress: DataTypes.TEXT,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.TEXT,
      areaId: DataTypes.INTEGER,
      // accountNo: DataTypes.STRING,
      // accountHolderName: DataTypes.STRING,
      // bankName: DataTypes.STRING,
      // IFSC: DataTypes.STRING,
      branch: DataTypes.STRING,
      // adharCardNo: DataTypes.INTEGER,
      // panCardNo: DataTypes.STRING,
      // GSTNo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Vendor",
    }
  );
  return Vendor;
};
