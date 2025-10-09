import mongoose from "mongoose";
const { Schema } = mongoose;

const peliculaSchema = new Schema({
    titulo: { type: String, required: true},
    director: { type: String, required: true },
    genero: [{type: String, required: true}],
    anio:{type:Number, required:true},

});

export default mongoose.model("Pelicula", peliculaSchema);