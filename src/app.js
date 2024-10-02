import express from "express";
import morgan from "morgan";
import { getCookies, getStatus } from "./service/ups_service.js";

const app = express();
const PORT = process.env.PORT || 3000;

const ERRORS = {
  INVALID_TRACKING_NUMBER: "Error, trackingNumber must be 18 characters long",
};

app.use(morgan("dev"));
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
