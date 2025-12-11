// src/services/auth.service.js

// Asegúrate de que este puerto sea el mismo de tu Backend (4000)
const API_URL = 'http://localhost:4000'; 

export const requestPasswordReset = async (email) => {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Error al enviar correo');
  return data;
};

export const resetPassword = async (token, newPassword) => {
  const response = await fetch(`${API_URL}/auth/reset-password/${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: newPassword }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Error al cambiar contraseña');
  return data;
};