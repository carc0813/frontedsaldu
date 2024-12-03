

import axios from "axios";
import {jwtDecode} from "jwt-decode";

const API_URL = "http://localhost:8080";

let currentUser = null; // Variable para almacenar el usuario actual

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signIn`, { email, password });
    const token = response.data.token;
  

    localStorage.setItem('authToken', token); // Guarda el token para futuras solicitudes
     console.log('Inicio de sesión exitoso');

     
    // Decodificar el token para extraer datos del usuario
    const decodedUser = jwtDecode(token);
    console.log("Token descifrado:", decodedUser);

    // Almacenar datos del usuario actual
    currentUser = { token, role: decodedUser.role, id_user: decodedUser.id_user};

    return currentUser; // Devuelve el token y los datos del usuario
  } catch (error) {
    throw new Error("Credenciales inválidas");
  }
};

// Exportar una función para obtener el usuario actual
export const getCurrentUser = () => {
  if (!currentUser) throw new Error("El usuario no está autenticado");
  return currentUser;
};
