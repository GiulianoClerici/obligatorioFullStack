import express from 'express';
import { todasReviewsUsuarioController, crearReviewController,tiposController, eliminarReviewController, editarReviewController, reviewsPorTipoController,todasReviewsController, articulosTipoContoller} from '../controllers/review.controller.js';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { reviewSchema } from '../validators/review.validator.js';

const router = express.Router();

router.post('/crearReview', validateBodyMiddleware(reviewSchema), crearReviewController);
router.delete("/eliminarReview/:id", eliminarReviewController)
router.patch("/editarReview/:id", editarReviewController)
router.get("/tipo/:tipoArticulo", reviewsPorTipoController)
router.get("/", todasReviewsController)
router.get("/misReviews", todasReviewsUsuarioController)
router.get("/tipos", tiposController)
router.get("/articulos", articulosTipoContoller)

export default router;