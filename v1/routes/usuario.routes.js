import express from 'express';
import { modificarPremiumController } from "../controllers/usuario.controller.js";

const router = express.Router();

router.patch("/premium", modificarPremiumController)

export default router;