"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const EntregasRoutes_1 = __importDefault(require("./routes/EntregasRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Entregas API",
            version: "1.0.0",
            description: "API de gerenciamento de entregas",
        },
    },
    apis: ["./src/routes/*.ts"],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// Middlewares
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173",
}));
app.use(express_1.default.json());
// Routes
app.use("/entregas", EntregasRoutes_1.default);
app.listen(port, () => {
    console.log(`Server rodando na url http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map