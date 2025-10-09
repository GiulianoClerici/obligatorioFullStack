import {modificarPremiumService} from '../services/usuario.services.js';

export const modificarPremiumController = async (req, res) => {
  try {
    const id = req.user.id;;
    const usuarioModificado = await modificarPremiumService(id);
    return res.status(200).json(usuarioModificado);
  } catch (error) {
    return res.status(500).json({ message: "Id inexistente"});
  }
};