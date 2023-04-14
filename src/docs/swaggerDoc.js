const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = (app) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Nodejs API",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:6969/",
        },
      ],
    },
    apis: ["./src/docs/*.js"],
  };
  const swaggerSpec = swaggerJSDoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  //   /**
  //    * @swagger
  //    * /a:
  //    *  get:
  //    *      summary: This api for working
  //    *      description: This api for working
  //    *      responses:
  //    *          200:
  //    *              description: To test
  //    *
  //    *
  //    */
  //   app.get("/a", (req, res) => {
  //     res.send("Hello");
  //   });
};

module.exports = {
  swaggerDoc: swaggerDoc,
};
