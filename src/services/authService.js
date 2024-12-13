import axios from "axios";
import {jwtDecode} from "jwt-decode";

const API_URL = "http://localhost:8080";

let currentUser = null; // Variable para almacenar el usuario actual

// Función para limpiar los datos del usuario
const clearUserData = () => {
//  console.log("Limpiando datos de sesión anteriores...");
  currentUser = null; // Limpiar usuario en memoria
  localStorage.removeItem('token)') ;
  localStorage.removeItem('role');
};

// Función para iniciar sesión
export const loginUser = async (email, password) => {
  try {
    // Limpia cualquier sesión previa antes de continuar
    clearUserData();

    const response = await axios.post(`${API_URL}/auth/signIn`, { email, password });
    const token = response.data.token;

    // Guardar el token en localStorage
    localStorage.setItem('authToken', token); 
  //  console.log('Inicio de sesión exitoso');

    // Decodificar el token para extraer datos del usuario
    const decodedUser = jwtDecode(token);
   // console.log("Token descifrado:", decodedUser);

    // Almacenar datos del usuario actual
    currentUser = { token, role: decodedUser.role, id_user: decodedUser.id_user };
    localStorage.setItem('userRole', currentUser.role);

    return currentUser; // Devuelve el token y los datos del usuario
  } catch (error) {
    throw new Error("Credenciales inválidas");
  }
};

// Función para obtener el usuario actual
export const getCurrentUser = () => {
  if (!currentUser) throw new Error("El usuario no está autenticado");
  return currentUser;
};


// Función de logout mejorada

export const logoutUser = (currentRole) => {
 // console.log("Cerrando sesión...");
  
  // Limpia datos locales
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  localStorage.removeItem("products");

 // console.log("Sesión cerrada exitosamente");
};
