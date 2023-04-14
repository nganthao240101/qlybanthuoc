"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ProductOffers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
      discount_per: {
        type: Sequelize.STRING,
      },
      discount_price: {
        type: Sequelize.FLOAT,
      },
      qty: {
        type: Sequelize.INTEGER,
      },
      total: {
        type: Sequelize.FLOAT,
      },
      net_price: {
        type: Sequelize.FLOAT,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ProductOffers");
  },
};
