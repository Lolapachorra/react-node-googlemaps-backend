import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import RotaEntregas from "./routes/EntregasRoutes";

dotenv.config();

const app: Application = express();
const port: number = 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Entregas API",
      version: "1.0.0",
      description: "API de gerenciamento de entregas",
    },
  },
  apis: ["./dist/routes/*.js"],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// console.log(swaggerDocs);
// Middlewares
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

// Routes
app.use("/entregas", RotaEntregas);

app.listen(port, () => {
  console.log(`Server rodando na url http://localhost:${port}`);
});
