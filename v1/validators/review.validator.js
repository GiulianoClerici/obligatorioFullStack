import Joi from "joi";

export const reviewSchema = Joi.object({
    contenido: Joi.string().min(3).max(500).required().messages({
        "string.min": "El contenido debe tener al menos {#limit} caracteres",
        "string.max": "El contenido debe tener como máximo {#limit} caracteres",
        "any.required": "El contenido es obligatorio"
    }),

    puntuacion: Joi.number().integer().min(1).max(10).required().messages({
        "number.min": "La puntuación mínima es 1",
        "number.max": "La puntuación máxima es 10",
        "any.required": "La puntuación es obligatoria"
    }),
    articulo: Joi.string().required().messages({
        "any.required": "El artículo es obligatorio"
    }),
    fechaCreacion: Joi.date().optional(),
});