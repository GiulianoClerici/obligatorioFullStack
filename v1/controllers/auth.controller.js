import { loginService, registerService } from '../services/auth.services.js';

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