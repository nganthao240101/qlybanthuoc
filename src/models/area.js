"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Area.hasMany(models.Vendor_area, { foreignKey: "areaId" });
      Area.belongsTo(models.location, { foreignKey: "locationId" });
    }
  }
  Area.init(
    {
      name: DataTypes.STRING,
      locationId: DataTypes.INTEGER,
      zipcode: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Area",
    }
  );
  return Area;
};
