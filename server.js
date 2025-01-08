const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
require("dotenv").config();


const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Entregas API",
      version: "1.0.0",
      description: "API de gerenciamento de entregas",
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//middlewares
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

//routes
const RotaEntregas = require("./src/routes/EntregasRoutes.js");

app.use("/entregas", RotaEntregas);
app.listen(port, () => {
  console.log(`Server rodando na url ${port}`);
});
