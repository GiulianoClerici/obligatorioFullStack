import mongoose from "mongoose";
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email:{type: String, required: true, unique: true},
    contador: {type: Number},
    premium: {type:Boolean, required:true},
    fotoPerfil: { type: String, default: "https://res.cloudinary.com/dwxircl4f/image/upload/v1763061857/efjww0ehgcmogmdg1ni9.webp"}
});

export default mongoose.model("Usuario", usuarioSchema);
