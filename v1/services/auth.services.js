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

    const token = jwt.sign({ id: usuario._id, username, premium: usuario.premium, contador: usuario.contador }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

export const registerService = async ({username, password, email, fotoPerfil}) => {
    const usuario = await Usuario.findOne({$or: [{ username }, { email }]});
    if(usuario) {
        let err = new Error("Este usuario o mail ya fue utilizado");
        err.status = 409;
        throw err;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({
    username,
    password: hashPassword,
    email,
    contador: 0,
    premium: false,
    fotoPerfil: fotoPerfil
  });
    await nuevoUsuario.save();
    const token = jwt.sign({ id: nuevoUsuario._id, username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

export const validarTokenService = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    let err = new Error("Token inválido o expirado");
    err.status = 401;
    throw err;
  }
};