import express from 'express';
import { crearReviewController,tiposController, eliminarReviewController, editarReviewController, reviewsPorTipoController,todasReviewsController} from '../controllers/review.controller.js';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { reviewSchema } from '../validators/review.validator.js';

const router = express.Router();

router.post('/crearReview', validateBodyMiddleware(reviewSchema), crearReviewController);
router.delete("/eliminarReview/:id", eliminarReviewController)
router.patch("/editarReview/:id", editarReviewController)
router.get("/tipo/:tipoArticulo", reviewsPorTipoController)
router.get("/", todasReviewsController)
router.get("/tipos", tiposController)

export default router;