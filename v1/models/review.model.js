import mongoose from "mongoose";
import Usuario from "../models/usuario.model.js";

const { Schema } = mongoose;

const reviewSchema = new Schema({
    contenido: { type: String, required: true },
    puntuacion: { type: Number, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    articulo: { type: String, required: true },
    tipoArticulo: { type: String, required: true},
    fechaCreacion: { type: Date, default: Date.now }
});

export default mongoose.model("Review", reviewSchema);