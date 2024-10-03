import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: process.env.OPEN_API_VERSION,
    info: {
      title: process.env.API_TITLE,
      version: process.env.API_VERSION,
      description: process.env.API_DESCRIPTION,
    },
    servers: [
      {
        url: process.env.HOST_URL,
      },
    ],
  },
  apis: ["./src/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
