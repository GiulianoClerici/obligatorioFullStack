import Review from "../models/review.model.js";
import Usuario from "../models/usuario.model.js";
import mongoose from "mongoose";
import Pelicula from "../models/pelicula.model.js";
import Album from "../models/album.model.js";
import Libro from "../models/libro.model.js";

export const crearReviewService = async ({ contenido, puntuacion, usuario, articulo, fechaCreacion }) => {
  const user = await Usuario.findById(usuario);


  if (!user) {
    const err = new Error("El usuario no existe");
    err.status = 404;
    throw err;
  }

  let tipoArticulo = null;
  let nombreArticulo = null;

  for (const nombreModelo of mongoose.modelNames()) {

    if (["Usuario", "Review"].includes(nombreModelo)) continue;

    const Modelo = mongoose.model(nombreModelo);
    const item = await Modelo.findById(articulo);

    if (item) {
      tipoArticulo = nombreModelo;
      nombreArticulo = item.titulo || item.nombre;
      break;
    }
  }

  if (!tipoArticulo) {
    const err = new Error("El artículo no existe");
    err.status = 404;
    throw err;
  }

  if (!user.premium && user.contador >= 10) {
    const err = new Error("Has alcanzado el límite de reviews. Solo usuarios premium pueden crear más.");
    err.status = 403;
    throw err;
  }
  const nuevaReview = new Review({ contenido, puntuacion, usuario, articulo: nombreArticulo, tipoArticulo, fechaCreacion });
  await nuevaReview.save();

  user.contador += 1;
  await user.save();

  return {
    review: {
      _id: nuevaReview._id,
      contenido: nuevaReview.contenido,
      puntuacion: nuevaReview.puntuacion,
      usuario: user._id,
      username: user.username, 
      articulo: nuevaReview.articulo,
      tipoArticulo: nuevaReview.tipoArticulo,
      fechaCreacion: nuevaReview.fechaCreacion
    }
  }
};

export const eliminarReviewService = async (reviewId) => {
  const review = await Review.findById(reviewId);
  if (!review) {
    const err = new Error("La review no existe");
    err.status = 404;
    throw err;
  }
  const user = await Usuario.findById(review.usuario);
  if (!user) {
    const err = new Error("El usuario de la review no existe");
    err.status = 404;
    throw err;
  }
  await Review.findByIdAndDelete(reviewId);
  user.contador -= 1;
  await user.save();

  return { message: "Review eliminada correctamente", reviewId };
};

export const editarReviewService = async (id, data) => {
  const review = await Review.findByIdAndUpdate(id, data, { new: true });
  return review;
}

export const obtenerReviewsPorTipoService = async (tipoArticulo) => {
  const reviews = await Review.find({ tipoArticulo }).populate("usuario", "username -_id").populate("articulo", "titulo -_id");
  return reviews;

};

export const todasReviewsSerivce = async () => {
  return await Review.find().populate("usuario", "username -_id").populate("articulo", "titulo -_id");
};

export const obtenerTiposReviewService = async () => {
  const tipos = mongoose.modelNames().filter(nombre => nombre !== "Usuario" && nombre !== "Review");
  return tipos;
};

export const articulosTipoService = async () => {
  try {
    const modelos = mongoose.modelNames();
    const resultado = {};

    await Promise.all(
      modelos.map(async (tipo) => {
        const Modelo = mongoose.model(tipo);
        const articulos = await Modelo.find();
        resultado[tipo] = articulos;
      })
    );

    return resultado;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const todasReviewsUsuarioService = async (userId) => {
  return await Review.find({ usuario: userId })
    .populate("usuario", "username -_id")
    .populate("articulo", "titulo -_id");
};