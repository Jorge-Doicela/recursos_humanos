// services/auth.service.js
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { transporter } from '../utils/mailer.js';

const prisma = new PrismaClient();

export const solicitarRecuperacion = async (email) => {
  // 1. Limpiamos el email
  const emailLimpio = email.trim();
  console.log(`🔎 Buscando en tabla EMPLOYEE el email: "${emailLimpio}"`);

  // 2. CAMBIO IMPORTANTE: Usamos prisma.employee
  const employee = await prisma.employee.findFirst({
    where: {
      email: {
        equals: emailLimpio,
        mode: 'insensitive' // Ignora mayúsculas/minúsculas
      }
    }
  });

  if (!employee) {
    console.log("❌ No se encontró ningún empleado con ese email.");
    throw new Error("Usuario no encontrado");
  }

  console.log(`✅ Empleado encontrado: ID ${employee.id}`);

  // 3. Generar token
  const token = crypto.randomBytes(32).toString('hex');
  const expiracion = new Date(Date.now() + 3600000); // 1 hora

  // 4. Guardar token en la tabla EMPLOYEE
  await prisma.employee.update({
    where: { id: employee.id },
    data: {
      resetToken: token,
      resetTokenExpiry: expiracion
    }
  });

  // 5. Enviar Correo
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  
  await transporter.sendMail({
    from: `"Soporte RRHH" <${process.env.EMAIL_USER}>`,
    to: emailLimpio,
    subject: "Recuperación de Contraseña",
    html: `
      <h3>Recuperación de Contraseña</h3>
      <p>Has solicitado restablecer tu contraseña.</p>
      <p>Haz clic en el siguiente enlace (válido por 1 hora):</p>
      <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Restablecer Contraseña</a>
      <p>Si no fuiste tú, ignora este correo.</p>
    `
  });

  return { message: "Correo enviado correctamente" };
};

export const restablecerContrasena = async (token, newPassword) => {
  // Buscar en EMPLOYEE por token
  const employee = await prisma.employee.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gt: new Date() }
    }
  });

  if (!employee) throw new Error("Token inválido o expirado");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Actualizar EMPLOYEE
  await prisma.employee.update({
    where: { id: employee.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null
    }
  });

  return { message: "Contraseña actualizada con éxito" };
};