const mongoose = require("../db/conn.js");

const { Schema } = require("mongoose");

const Entrega = mongoose.model(
  "Entrega",
  new Schema(
    {
      nome: { type: "string", required: true },
      pontoPartida: { type: "string", required: true},
      pontoDestino: { type: "string", required: true},
    },
    { timestamps: true }
  )
);

module.exports = Entrega;