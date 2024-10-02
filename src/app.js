import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json" };
import { getCookies, getStatus } from "./service/ups_service.js";

const app = express();
const PORT = process.env.PORT || 3000;

const ERRORS = {
  INVALID_TRACKING_NUMBER: "Error, trackingNumber must be 18 characters long",
};

/**
 * Sets up the Swagger UI for API documentation.
 *
 * @constant {string} swaggerUiRoute - The route for the Swagger UI.
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(morgan("dev"));
app.use(express.json());

/**
 * Handles GET requests to retrieve the status of a package by its tracking number.
 *
 * @async
 * @function getTrackingStatus
 * @param {string} trackingNumber - The tracking number of the package.
 *
 * @returns {Object} The order status of the package.
 *
 * @throws {Error} If the tracking number is not valid or if an error occurs during fetching.
 */
app.get("/:trackingNumber", async (req, res) => {
  try {
    const trackingNumber = req.params.trackingNumber;

    const trackingNumberRegex = /^[A-Z0-9]{18}$/;
    if (!trackingNumberRegex.test(trackingNumber)) {
      return res.status(400).send(ERRORS.INVALID_TRACKING_NUMBER);
    }

    const cookies = await getCookies();
    const orderStatus = await getStatus(String(trackingNumber), cookies);

    res.json(orderStatus);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/**
 * Starts the Express server on the specified port.
 *
 * @function
 * @param {number} PORT - The port on which the server will listen.
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
