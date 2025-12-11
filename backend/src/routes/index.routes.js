import { Router } from 'express';
// 1. AÑADIMOS LAS IMPORTACIONES AQUÍ
import { login, forgotPassword, resetPassword } from '../controllers/authController.js';

const router = Router();

// Ruta de prueba
router.get('/', (req, res) => {
    res.send('API EMPLIFI funcionando correctamente v1');
});

// Login real
router.post('/auth/login', login);

// ==========================================
// 2. AÑADIMOS LAS RUTAS DE RECUPERACIÓN
// ==========================================

// Paso 1: El usuario envía su correo para pedir el link
router.post('/auth/forgot-password', forgotPassword);

// Paso 2: El usuario envía el token y la nueva contraseña
router.post('/auth/reset-password/:token', resetPassword);

export default router;