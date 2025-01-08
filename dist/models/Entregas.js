"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conn_js_1 = __importDefault(require("../db/conn.js"));
const mongoose_1 = require("mongoose");
const EntregaSchema = new mongoose_1.Schema({
    nome: { type: String, required: true },
    pontoPartida: { type: String, required: true },
    pontoDestino: { type: String, required: true },
}, { timestamps: true });
const Entrega = conn_js_1.default.model("Entrega", EntregaSchema);
exports.default = Entrega;
//# sourceMappingURL=Entregas.js.map