import { loginService, registerService, validarTokenService } from '../services/auth.services.js';

export const loginController = async (req, res) => {
    try {
        const token = await loginService(req.body);
        return res.status(200).json({message: 'Login exitoso',token});
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || 'Error en el login' });
    }
};

export const registerController = async (req, res) => {
    try {
        const token = await registerService(req.body);
        return res.status(201).json({message: 'Usuario registrado exitosamente',token});
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || 'Error en el registro' });
    }
};

export const validarTokenController = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token no proporcionado" });
    }

    const decoded = await validarTokenService(token);

    return res.status(200).json({
      message: "Token válido"
    });

  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Error al validar token",
    });
  }
};