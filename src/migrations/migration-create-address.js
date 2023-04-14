"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Addresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullname: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      orderId: {
        type: Sequelize.INTEGER,
      },
      discrict: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      states: {
        type: Sequelize.STRING,
      },
      area: {
        type: Sequelize.STRING,
      },
      shipping: {
        type: Sequelize.TEXT,
      },
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
    await queryInterface.dropTable("Addresses");
  },
};
