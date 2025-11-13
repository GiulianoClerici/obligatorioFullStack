
import Usuario from '../models/usuario.model.js';

export const modificarPremiumService = async (id, data) => {
    const usuario = await Usuario.findById(id);
    if (!usuario.premium) {
        usuario.premium = true;
        await usuario.save();
    } else {
        usuario.premium = false;
        await usuario.save();
    }
    return usuario;
}

export const usuarioActualService = async (id, data) => {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
        const err = new Error("Usuario no encontrado");
        err.status = 404;
        throw err;
    }
    return {
        premium: usuario.premium,
        contador: usuario.contador,
        fotoPerfil: usuario.fotoPerfil
    };
}