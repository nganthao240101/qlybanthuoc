"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.INTEGER,
      },
      subCategoryId: {
        type: Sequelize.INTEGER,
      },
      childCategoryId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      brand: {
        type: Sequelize.STRING,
      },
      batch: {
        type: Sequelize.STRING,
      },
      expiry: {
        type: Sequelize.STRING,
      },

      qty: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      unit: {
        type: Sequelize.STRING,
      },
      // buyerPrice: {
      //   type: Sequelize.INTEGER,
      // },
      price: {
        type: Sequelize.INTEGER,
      },

      discount: {
        type: Sequelize.INTEGER,
      },
      total: {
        type: Sequelize.INTEGER,
      },
      // netPrice: {
      //   type: Sequelize.INTEGER,
      // },
      photo: {
        type: Sequelize.STRING,
      },
      // sortDesc: {
      //   type: Sequelize.TEXT,
      // },
      description: {
        type: Sequelize.STRING,
      },
      // desc: {
      //   type: Sequelize.TEXT,
      // },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("products");
  },
};
