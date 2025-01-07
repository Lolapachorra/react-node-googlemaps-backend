const Entrega = require('../models/Entregas.js')
const ObjectId = require('mongoose').Types.ObjectId
const axios = require('axios');


module.exports = class EntregasController {
    static async createEntrega(req, res) {
        const { nome, pontoPartida, pontoDestino } = req.body
        if (!nome || !pontoPartida || !pontoDestino) return res.status(404).json({ error: 'todos os dados devem ser preenchidos' })
        const entrega = new Entrega({
            nome: nome,
            pontoPartida: pontoPartida,
            pontoDestino: pontoDestino
        })

        //create
        try {
            const newEntrega = await entrega.save()
            res.status(201).json(newEntrega)
        } catch (error) {
            res.status(400).json({ message: 'Ocorreu um erro inesperado' })
        }
    }
    static async getAllEntregas(req, res) {
        try {
            const entregas = await Entrega.find()
            res.status(200).json({ entregas: entregas })
        } catch (error) {
            res.status(500).json({ message: 'Ocorreu um erro inesperado' })
        }
    }
    static async getEntregaById(req, res) {
        const { id } = req.params
        if (!ObjectId.isValid(id)) return res.status(404).json({ error: 'ID inválido' })
        try {
            const entrega = await Entrega.findById(id)
            if (!entrega) return res.status(404).json({ error: 'Entrega não encontrada' })
            res.json(entrega)
        } catch (error) {
            res.status(500).json({ message: 'Ocorreu um erro inesperado' })
        }
    }
    static async deleteEntregaById(req, res) {
        const { id } = req.params
        if (!ObjectId.isValid(id)) return res.status(404).json({ error: 'ID inválido' })
        try {
            const deletedEntrega = await Entrega.findByIdAndDelete(id)
            if (!deletedEntrega) return res.status(404).json({ error: 'Entrega não encontrada' })
            res.json({ message: 'Entrega deletada com sucesso' })
        } catch (error) {
            res.status(500).json({ message: 'Ocorreu um erro inesperado' })
        }
    }
    static async patchEntrega(req, res) {
        const { id } = req.params
        if (!ObjectId.isValid(id)) return res.status(404).json({ error: 'ID inválido' })
        const { nome, pontoPartida, pontoDestino } = req.body
        if (!nome && !pontoPartida && !pontoDestino) return res.status(400).json({ error: 'Nenhum dado foi alterado' })
        try {
            const updatedEntrega = await Entrega.findByIdAndUpdate(id, { $set: req.body }, { new: true })
            if (!updatedEntrega) return res.status(404).json({ error: 'Entrega não encontrada' })
            res.json(updatedEntrega)
        } catch (error) {
            res.status(500).json({ message: 'Ocorreu um erro inesperado' })
        }
    }
    static async calcularRota(req, res) {
        const { id } = req.params
        if (!ObjectId.isValid(id)) return res.status(404).json({ error: 'Id Inválido' })
        try {
            const entrega = await Entrega.findById(id)
            if (!entrega) return res.status(404).json({ error: 'Entrega não encontrada' })
            const { pontoPartida, pontoDestino } = entrega
            const apiKey = process.env.API_KEY
            console.log(apiKey)
            console.log(pontoPartida)
            console.log(pontoDestino)
            const directionURL = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(pontoPartida)}&destination=${encodeURIComponent(pontoDestino)}&key=${apiKey}`
            const response = await axios.get(directionURL)
            // Extrair dados da rota
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
            res.status(500).json({ message: error.message })
        }
    }

}