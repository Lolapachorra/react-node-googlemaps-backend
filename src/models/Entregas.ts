import mongoose from "../db/conn.js";
import { Schema, Document, Model } from "mongoose";

interface IEntrega extends Document {
  nome: string;
  pontoPartida: string;
  pontoDestino: string;
}


const EntregaSchema: Schema<IEntrega> = new Schema(
  {
    nome: { type: String, required: true },
    pontoPartida: { type: String, required: true },
    pontoDestino: { type: String, required: true },
  },
  { timestamps: true }
);


const Entrega: Model<IEntrega> = mongoose.model<IEntrega>("Entrega", EntregaSchema);

export default Entrega;
