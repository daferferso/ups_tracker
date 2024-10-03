import { Router } from "express";
import { getCookies, getStatus } from "../service/upsService.js";

const upsRouter = Router();

const ERRORS = {
  INVALID_TRACKING_NUMBER: "Error, trackingNumber must be 18 characters long",
};

/**
 * @swagger
 * /{trackingNumber}:
 *   get:
 *     summary: Get package status
 *     parameters:
 *       - name: trackingNumber
 *         in: path
 *         required: true
 *         description: Tracking number of the package (18 characters).
 *         schema:
 *           type: string
 *           example: "1Z3TWW700308932865"
 *     responses:
 *       200:
 *         description: Package status retrieved successfully.
 *       400:
 *         description: Invalid tracking number.
 *       500:
 *         description: Error retrieving the package status.
 */
upsRouter.get("/:trackingNumber", async (req, res) => {
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

export default upsRouter;
