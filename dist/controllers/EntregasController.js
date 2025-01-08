"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const axios_1 = __importDefault(require("axios"));
const Entregas_1 = __importDefault(require("../models/Entregas"));
class EntregasController {
    static createEntrega(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, pontoPartida, pontoDestino } = req.body;
            if (!nome || !pontoPartida || !pontoDestino) {
                res.status(404).json({ error: "Todos os dados devem ser preenchidos" });
                return;
            }
            const entrega = new Entregas_1.default({
                nome: nome,
                pontoPartida: pontoPartida,
                pontoDestino: pontoDestino,
            });
            try {
                const newEntrega = yield entrega.save();
                res.status(201).json(newEntrega);
            }
            catch (error) {
                res.status(400).json({ message: "Ocorreu um erro inesperado" });
            }
        });
    }
    static getAllEntregas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entregas = yield Entregas_1.default.find();
                res.status(200).json({ entregas: entregas });
            }
            catch (error) {
                res.status(500).json({ message: "Ocorreu um erro inesperado" });
            }
        });
    }
    static getEntregaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                res.status(404).json({ error: "ID inválido" });
                return;
            }
            try {
                const entrega = yield Entregas_1.default.findById(id);
                if (!entrega) {
                    res.status(404).json({ error: "Entrega não encontrada" });
                    return;
                }
                res.status(200).json(entrega);
            }
            catch (error) {
                res.status(500).json({ message: "Ocorreu um erro inesperado" });
            }
        });
    }
    static deleteEntregaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                res.status(404).json({ error: "ID inválido" });
                return;
            }
            try {
                const deletedEntrega = yield Entregas_1.default.findByIdAndDelete(id);
                if (!deletedEntrega) {
                    res.status(404).json({ error: "Entrega não encontrada" });
                    return;
                }
                res.json({ message: "Entrega deletada com sucesso" });
            }
            catch (error) {
                res.status(500).json({ message: "Ocorreu um erro inesperado" });
            }
        });
    }
    static patchEntrega(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                res.status(404).json({ error: "ID inválido" });
                return;
            }
            const { nome, pontoPartida, pontoDestino } = req.body;
            if (!nome && !pontoPartida && !pontoDestino) {
                res.status(400).json({ error: "Nenhum dado foi alterado" });
                return;
            }
            try {
                const updatedEntrega = yield Entregas_1.default.findByIdAndUpdate(id, { $set: req.body }, { new: true });
                if (!updatedEntrega) {
                    res.status(404).json({ error: "Entrega não encontrada" });
                    return;
                }
                res.json(updatedEntrega);
            }
            catch (error) {
                res.status(500).json({ message: "Ocorreu um erro inesperado" });
            }
        });
    }
    static calcularRota(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                res.status(404).json({ error: "ID inválido" });
                return;
            }
            try {
                const entrega = yield Entregas_1.default.findById(id);
                if (!entrega) {
                    res.status(404).json({ error: "Entrega não encontrada" });
                    return;
                }
                const { pontoPartida, pontoDestino } = entrega;
                const apiKey = process.env.API_KEY;
                const directionURL = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(pontoPartida)}&destination=${encodeURIComponent(pontoDestino)}&key=${apiKey}`;
                const response = yield axios_1.default.get(directionURL);
                const route = response.data.routes[0].legs[0];
                res.status(200).json({
                    nome: entrega.nome,
                    pontoPartida: route.start_address,
                    pontoDestino: route.end_address,
                    distancia: route.distance.text,
                    duracao: route.duration.text,
                });
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
}
exports.default = EntregasController;
//# sourceMappingURL=EntregasController.js.map