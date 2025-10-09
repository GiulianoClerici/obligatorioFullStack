import Usuario from "../models/usuario.model.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const loginService = async ({username, password}) => {
    const usuario = await Usuario.findOne({ username });
    if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
        let err = new Error("Credenciales inválidas");
        err.status = 401;
        throw err;
    }

    const token = jwt.sign({ id: usuario._id, username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

export const registerService = async ({username, password, email}) => {
    const usuario = await Usuario.findOne({$or: [{ username }, { email }]});
    if(usuario) {
        let err = new Error("Este usuario o mail ya fue utilizado");
        err.status = 409;
        throw err;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({username, password: hashPassword,email, contador: 0, premium: false});
    await nuevoUsuario.save();
    const token = jwt.sign({ id: nuevoUsuario._id, username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}