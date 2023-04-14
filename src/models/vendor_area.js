"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vendor_area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vendor_area.init(
    {
      vendorId: DataTypes.INTEGER,
      areaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Vendor_area",
    }
  );
  return Vendor_area;
};
