import mongoose from "mongoose";
const { Schema } = mongoose;

const libroSchema = new Schema({
    titulo: { type: String, required: true},
    autor: { type: String, required: true },
    genero: [{type: String, required: true}],
    anio:{type:Number, required:true},

});

export default mongoose.model("Libro", libroSchema);