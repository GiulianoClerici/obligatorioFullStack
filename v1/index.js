import express from 'express';
import authRoutes from './routes/auth.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import reviewRoutes from './routes/review.routes.js';
import {authenticateMiddleware} from './middlewares/auth.middleware.js';


const router = express.Router();

router.get('/', (req, res) => {
  res.json('prueba');
});

router.use("/auth", authRoutes);


router.use(authenticateMiddleware);

router.use("/usuario", usuarioRoutes)

router.use("/review", reviewRoutes)



export default router;