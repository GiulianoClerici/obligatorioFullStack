import express from 'express';
import { modificarPremiumController, usuarioActualController } from "../controllers/usuario.controller.js";

const router = express.Router();

router.patch("/premium", modificarPremiumController)
router.get("/me", usuarioActualController)

export default router;