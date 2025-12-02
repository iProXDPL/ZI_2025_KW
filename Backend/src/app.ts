import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger";
import authRoutes from "./routes/auth";
import buildingRoutes from "./routes/buildings";
import roomRoutes from "./routes/rooms";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "../../../.env" });
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/buildings", buildingRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/", (_, res) => res.json({ message: "API działa poprawnie" }));

export default app;
