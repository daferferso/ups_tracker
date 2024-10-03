import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UPS Tracker API",
      version: "1.0.0",
      description:
        "UPSTracker is a Node.js service that fetches real-time order status from UPS using tracking numbers. It handles cookie management and API requests to UPS’s platform, providing detailed tracking information for your shipments.",
    },
    servers: [
      {
        url: "https://ups-tracker.vercel.app",
      },
    ],
  },
  apis: ["./src/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
