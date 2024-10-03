import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: process.env.OPEN_API_VERSION,
    info: {
      title: process.env.API_TITLE,
      version: process.env.API_VERSION,
      description: process.env.API_DESCRIPTION,
      contact: {
        name: "Fernando Fernandez",
        email: "daferferso@gmail.com",
        url: "https://github.com/daferferso/ups_tracker",
      },
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
