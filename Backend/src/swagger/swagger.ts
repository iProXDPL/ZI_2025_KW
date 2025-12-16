import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../../.env") });

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "System rejestracji sal",
      version: "1.0.0",
      description: "API do zarządzania salami",
    },
    servers: [
      {
        url: process.env.VITE_API_BASE_URL || "http://localhost:3000",
        description: "Serwer API",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(options);
