import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger";
import authRoutes from "./routes/auth";
import buildingRoutes from "./routes/buildings";
import roomRoutes from "./routes/rooms";
import reservationRoutes from "./routes/reservationRoutes";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../../.env") });
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/buildings", buildingRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/", (_, res) => res.json({ message: "API działa poprawnie" }));

export default app;
