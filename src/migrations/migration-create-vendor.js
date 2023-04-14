"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("vendors", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      storename: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        defaultValue: "active",
      },
      shopaddress: {
        type: Sequelize.TEXT,
      },
      shopdesc: {
        type: Sequelize.TEXT,
      },
      ownername: {
        type: Sequelize.STRING,
      },
      owneraddress: {
        type: Sequelize.TEXT,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.TEXT,
      },
      areaId: {
        type: Sequelize.INTEGER,
      },
      // accountNo: {
      //   type: Sequelize.STRING,
      // },
      // accountHolderName: {
      //   type: Sequelize.STRING,
      // },
      // IFSC: {
      //   type: Sequelize.STRING,
      // },
      // bankName: {
      //   type: Sequelize.STRING,
      // },
      branch: {
        type: Sequelize.STRING,
      },
      // adharCardNo: {
      //   type: Sequelize.STRING,
      // },
      // panCardNo: {
      //   type: Sequelize.STRING,
      // },
      // GSTNo: {
      //   type: Sequelize.STRING,
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
    await queryInterface.dropTable("vendors");
  },
};
