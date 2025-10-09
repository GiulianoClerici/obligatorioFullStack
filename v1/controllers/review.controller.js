import { crearReviewService, eliminarReviewService,obtenerTiposReviewService, editarReviewService, obtenerReviewsPorTipoService, todasReviewsSerivce } from "../services/review.services.js";


export const crearReviewController = async (req, res) => {
    try {
        const { contenido, puntuacion, articulo, tipoArticulo } = req.body;
        const usuario = req.user.id;
        const review = await crearReviewService({ contenido, puntuacion, usuario, articulo, tipoArticulo });

        return res.status(201).json({ message: "Reseña creada con éxito", review, });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message || "Error al crear la reseña" });
    }
};

export const eliminarReviewController = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await eliminarReviewService(id);
        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};

export const editarReviewController = async (req, res) => {
    try {
        const { id } = req.params;
        const reviewModificada = await editarReviewService(id, req.body);
        return res.status(200).json(reviewModificada);
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};



export const reviewsPorTipoController = async (req, res) => {
    try {
        const { tipoArticulo } = req.params;
        const reviews = await obtenerReviewsPorTipoService(tipoArticulo);
        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};


export const todasReviewsController = async (req, res) => {
    const reviews = await todasReviewsSerivce();
    return res.status(200).json(reviews);
}

export const tiposController = async (req, res) => {
    try {
        const tipos = await obtenerTiposReviewService();
        return res.status(200).json(tipos);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}