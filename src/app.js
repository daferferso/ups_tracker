import express from "express";
import morgan from "morgan";
import { getCookies, getStatus } from "./service/ups_service.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());

app.get("/:trackingNumber", async (req, res) => {
  try {
    const trackingNumber = req.params.trackingNumber;

    if (trackingNumber.length !== 18) {
      return res
        .status(400)
        .send("Error, trackingNumber must be 18 characters long");
    }

    const cookies = await getCookies();
    const orderStatus = await getStatus(String(trackingNumber), cookies);
    res.json(orderStatus);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("Error fetching tracking status");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
