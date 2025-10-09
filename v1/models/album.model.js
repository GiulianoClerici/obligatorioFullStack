import mongoose from "mongoose";
const { Schema } = mongoose;

const albumSchema = new Schema({
    titulo: { type: String, required: true},
    artista: { type: String, required: true },
    genero: [{type: String, required: true}],
    anio:{type:Number, required:true}
});

export default mongoose.model("Album", albumSchema, "albumes");