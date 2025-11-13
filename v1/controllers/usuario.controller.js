import {modificarPremiumService, usuarioActualService} from '../services/usuario.services.js';

export const modificarPremiumController = async (req, res) => {
  try {
    const id = req.user.id;;
    const usuarioModificado = await modificarPremiumService(id);
    return res.status(200).json(usuarioModificado);
  } catch (error) {
    return res.status(500).json({ message: "Id inexistente"});
  }
};

export const usuarioActualController = async (req, res) => {
  try {
    const id = req.user.id;
    const datosUsuario = await usuarioActualService(id);
    return res.status(200).json(datosUsuario);
  } catch (error) {
    return res.status(500).json({ message: "Id inexistente"});
  }
};