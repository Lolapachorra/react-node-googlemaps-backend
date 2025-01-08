import { Router } from "express";
import EntregasController from "../controllers/EntregasController";

const router = Router();

// Rota CRUD
router.post("/create", EntregasController.createEntrega);
router.patch("/edit/:id", EntregasController.patchEntrega);
router.get("/:id", EntregasController.getEntregaById);
router.delete("/delete/:id", EntregasController.deleteEntregaById);
router.get("/", EntregasController.getAllEntregas);
router.get("/calculateroute/:id", EntregasController.calcularRota);

export default router;