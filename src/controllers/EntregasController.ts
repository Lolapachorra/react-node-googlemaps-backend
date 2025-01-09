import { Request, Response } from "express";
import { Types } from "mongoose";
import axios from "axios";
import Entrega from "../models/Entregas";

export default class EntregasController {
  static async createEntrega(req: Request, res: Response): Promise<void> {
    const { nome, pontoPartida, pontoDestino } = req.body;

    if (!nome || !pontoPartida || !pontoDestino) {
      res.status(404).json({ error: "Todos os dados devem ser preenchidos" });
      return;
    }

    const entrega = new Entrega({
      nome: nome,
      pontoPartida: pontoPartida,
      pontoDestino: pontoDestino,
    });

    try {
      const newEntrega = await entrega.save();
      res.status(201).json(newEntrega);
    } catch (error) {
      res.status(400).json({ message: "Ocorreu um erro inesperado" });
    }
  }

  static async getAllEntregas(req: Request, res: Response): Promise<void> {
    try {
      const entregas = await Entrega.find();
      res.status(200).json({ entregas: entregas });
    } catch (error) {
      res.status(500).json({ message: "Ocorreu um erro inesperado" });
    }
  }

  static async getEntregaById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "ID inválido" });
      return;
    }

    try {
      const entrega = await Entrega.findById(id);
      if (!entrega) {
        res.status(404).json({ error: "Entrega não encontrada" });
        return;
      }
      res.status(200).json(entrega);
    } catch (error) {
      res.status(500).json({ message: "Ocorreu um erro inesperado" });
    }
  }

  static async deleteEntregaById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "ID inválido" });
      return;
    }

    try {
      const deletedEntrega = await Entrega.findByIdAndDelete(id);
      if (!deletedEntrega) {
        res.status(404).json({ error: "Entrega não encontrada" });
        return;
      }
      res.json({ message: "Entrega deletada com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Ocorreu um erro inesperado" });
    }
  }

  static async patchEntrega(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "ID inválido" });
      return;
    }

    const { nome, pontoPartida, pontoDestino } = req.body;

    if (!nome && !pontoPartida && !pontoDestino) {
      res.status(400).json({ error: "Nenhum dado foi alterado" });
      return;
    }

    try {
      const updatedEntrega = await Entrega.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      if (!updatedEntrega) {
        res.status(404).json({ error: "Entrega não encontrada" });
        return;
      }
      res.json(updatedEntrega);
    } catch (error) {
      res.status(500).json({ message: "Ocorreu um erro inesperado" });
    }
  }

  static async calcularRota(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "ID inválido" });
      return;
    }

    try {
      const entrega = await Entrega.findById(id);
      if (!entrega) {
        res.status(404).json({ error: "Entrega não encontrada" });
        return;
      }

      const { pontoPartida, pontoDestino } = entrega;
      const apiKey = process.env.API_KEY;

      const directionURL = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
        pontoPartida
      )}&destination=${encodeURIComponent(pontoDestino)}&key=${apiKey}&language=pt-br`;

      const response = await axios.get(directionURL);

      const route = response.data.routes[0].legs[0];
      res.status(200).json({
        nome: entrega.nome,
        pontoPartida: route.start_address,
        pontoDestino: route.end_address,
        distancia: route.distance.text,
        duracao: route.duration.text,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
