import mongoose from "mongoose";
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email:{type: String, required: true, unique: true},
    contador: {type: Number},
    premium: {type:Boolean, required:true}
});

export default mongoose.model("Usuario", usuarioSchema);
