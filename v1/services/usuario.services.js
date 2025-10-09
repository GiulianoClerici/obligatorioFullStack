
import Usuario from '../models/usuario.model.js';

export const modificarPremiumService = async (id, data) => {
    const usuario = await Usuario.findById(id);
    if(!usuario.premium){
        usuario.premium = true;
        await usuario.save();
    }else{
        usuario.premium=false;
        await usuario.save();
    }
    return usuario;
}