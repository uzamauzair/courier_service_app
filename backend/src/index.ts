import express from "express"
import cors from "cors"

import userRoutes from "./routes/userRoute";
import shipmentRoutes from './routes/shipmentRoute'

const app = express();
app.use(cors());
const port = 1337 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/shipment", shipmentRoutes)

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
