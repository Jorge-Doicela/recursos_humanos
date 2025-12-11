import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario
        const user = await prisma.employee.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas',
            });
        }

        // Verificar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas',
            });
        }

        // Generar Token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || 'secret_key_change_me',
            { expiresIn: '1d' }
        );

        res.status(200).json({
            success: true,
            message: 'Login exitoso',
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
        });
    }
};

// controllers/auth.controller.js


// controllers/authController.js
import * as authService from '../services/auth.service.js'; // Asegúrate que la ruta sea correcta

export const forgotPassword = async (req, res) => {
    console.log("--- INICIO DEBUG FORGOT PASSWORD ---");
    
    // 1. Ver qué llega exactamente
    const { email } = req.body;
    console.log("1. Email recibido:", email);
    console.log("2. Tipo de dato:", typeof email);
    
    if (!email) {
        console.log("ERROR: El email llegó vacío o undefined");
        return res.status(400).json({ error: "No se envió el campo email" });
    }

    try {
        // 3. Llamar al servicio
        console.log("3. Llamando al servicio...");
        const result = await authService.solicitarRecuperacion(email);
        console.log("4. Servicio respondió éxito");
        res.json(result);
        
    } catch (error) {
        console.log("--- ERROR ENCONTRADO ---");
        console.error(error.message); // Aquí saldrá por qué falló
        res.status(400).json({ error: error.message });
    }
    console.log("--- FIN DEBUG ---");
};
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params; // O req.body, depende de cómo lo envíes
    const { password } = req.body;
    const result = await authService.restablecerContrasena(token, password);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};