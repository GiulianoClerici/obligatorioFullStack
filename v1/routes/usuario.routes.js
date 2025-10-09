import express from 'express';
import { modificarPremiumController } from "../controllers/usuario.controller.js";

const router = express.Router();

router.patch("/premium/:id", modificarPremiumController)

export default router;