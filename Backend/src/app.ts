import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger";
import authRoutes from "./routes/auth";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/", (_, res) => res.json({ message: "API działa poprawnie" }));

export default app;
