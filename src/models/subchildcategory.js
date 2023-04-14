"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubChildCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubChildCategory.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
      SubChildCategory.belongsTo(models.SubCategory, {
        foreignKey: "subcategoryId",
      });
      SubChildCategory.hasMany(models.Product, {
        foreignKey: "childCategoryId",
      });
    }
  }
  SubChildCategory.init(
    {
      name: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      subcategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SubChildCategory",
    }
  );
  return SubChildCategory;
};
