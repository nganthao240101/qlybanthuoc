"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderCreationId: {
        type: Sequelize.STRING,
      },
      razorpayPaymentId: {
        type: Sequelize.STRING,
      },
      custId: {
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.DOUBLE,
      },
      status: {
        type: Sequelize.STRING,
      },
      razorpayOrderId: {
        type: Sequelize.STRING,
      },
      method: {
        type: Sequelize.STRING,
      },
      currency: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Payments");
  },
};
