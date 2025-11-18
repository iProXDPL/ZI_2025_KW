import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

dotenv.config();
const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB(process.env.MONGO_URI as string);
  app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/api/docs`);
  });
})();
