import { Router } from "express";
import EntregasController from "../controllers/EntregasController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Entregas
 *   description: Operações relacionadas a entregas
 */

/**
 * @swagger
 * /entregas:
 *   get:
 *     summary: Retorna a lista de todas as entregas
 *     tags: [Entregas]
 *     responses:
 *       200:
 *         description: Lista de entregas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 entregas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "656ab1234f5e67abcde89f00"
 *                       nome:
 *                         type: string
 *                         example: "Entrega de produtos"
 *                       pontoPartida:
 *                         type: string
 *                         example: "Rua A, 100"
 *                       pontoDestino:
 *                         type: string
 *                         example: "Avenida B, 200"
 */
router.get("/", EntregasController.getAllEntregas);

/**
 * @swagger
 * /entregas/{id}:
 *   get:
 *     summary: Retorna uma entrega específica pelo ID
 *     tags: [Entregas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da entrega
 *     responses:
 *       200:
 *         description: Entrega retornada com sucesso
 *       404:
 *         description: Entrega não encontrada ou ID inválido
 */
router.get("/:id", EntregasController.getEntregaById);

/**
 * @swagger
 * /entregas/create:
 *   post:
 *     summary: Cria uma nova entrega
 *     tags: [Entregas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Entrega Expressa"
 *               pontoPartida:
 *                 type: string
 *                 example: "Rua Principal, 123"
 *               pontoDestino:
 *                 type: string
 *                 example: "Avenida Central, 456"
 *     responses:
 *       201:
 *         description: Entrega criada com sucesso
 *       400:
 *         description: Erro ao criar entrega (dados ausentes ou inválidos)
 */
router.post("/create", EntregasController.createEntrega);

/**
 * @swagger
 * /entregas/edit/{id}:
 *   patch:
 *     summary: Edita uma entrega existente
 *     tags: [Entregas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da entrega a ser editada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Nova Entrega Atualizada"
 *               pontoPartida:
 *                 type: string
 *                 example: "Rua Nova, 789"
 *               pontoDestino:
 *                 type: string
 *                 example: "Praça das Flores, 321"
 *     responses:
 *       200:
 *         description: Entrega atualizada com sucesso
 *       404:
 *         description: Entrega não encontrada ou ID inválido
 */
router.patch("/edit/:id", EntregasController.patchEntrega);

/**
 * @swagger
 * /entregas/delete/{id}:
 *   delete:
 *     summary: Deleta uma entrega pelo ID
 *     tags: [Entregas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da entrega a ser deletada
 *     responses:
 *       200:
 *         description: Entrega deletada com sucesso
 *       404:
 *         description: Entrega não encontrada ou ID inválido
 */
router.delete("/delete/:id", EntregasController.deleteEntregaById);

/**
 * @swagger
 * /entregas/calculateroute/{id}:
 *   get:
 *     summary: Calcula a rota de entrega usando Google Maps API
 *     tags: [Entregas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da entrega para calcular a rota
 *     responses:
 *       200:
 *         description: Rota calculada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nome:
 *                   type: string
 *                   example: "Entrega Rápida"
 *                 pontoPartida:
 *                   type: string
 *                   example: "Rua A, 200"
 *                 pontoDestino:
 *                   type: string
 *                   example: "Rua B, 300"
 *                 distancia:
 *                   type: string
 *                   example: "15 km"
 *                 duracao:
 *                   type: string
 *                   example: "30 min"
 *       404:
 *         description: Entrega não encontrada
 *       500:
 *         description: Erro ao calcular rota
 */
router.get("/calculateroute/:id", EntregasController.calcularRota);

export default router;
