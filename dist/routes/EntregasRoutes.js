"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EntregasController_1 = __importDefault(require("../controllers/EntregasController"));
const router = (0, express_1.Router)();
// Rota CRUD
router.post("/create", EntregasController_1.default.createEntrega);
router.patch("/edit/:id", EntregasController_1.default.patchEntrega);
router.get("/:id", EntregasController_1.default.getEntregaById);
router.delete("/delete/:id", EntregasController_1.default.deleteEntregaById);
router.get("/", EntregasController_1.default.getAllEntregas);
router.get("/calculateroute/:id", EntregasController_1.default.calcularRota);
exports.default = router;
//# sourceMappingURL=EntregasRoutes.js.map