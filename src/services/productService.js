
import axios from "axios";

const API_URL = "http://localhost:8080";

const token = localStorage.getItem('authToken'); // Recuperar el token
const role = localStorage.getItem('userRole');//Recuperar el Rol 


console.log("Rol del usuario:", role);
// Función para obtener todos los productos
export const fetchProductsByRole= async (page = 1, limit = 12) => {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
      },
      params: {
        page, // Página actual
        limit, // Número de elementos por página
        role
      },
    })
   


    console.log("Datos completos recibidos del backend:", response.data);

    // Formatear los productos para mantener solo la información relevante
    const products = response.data.productsData.map((product) => {
      const { id, name, description, status, price, images, stock_status } = product;

      // Verificar si el producto tiene imágenes asociadas
      const formattedImages = images.map((image) => ({
        id: image.id,
        src: image.src,
        name: image.name,
        alt: image.alt || "Sin descripción",
      }));

      return {
        id,
        name,
        description,
        status,
        price,
        images: formattedImages,
        stock_status,
      };
    });

    return  {
      products,
      totalPages: response.data.totalPages, // Número total de páginas
      currentPage: response.data.currentPage, // Página actual
    };
  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
    throw error; // Lanza el error para manejarlo en el frontend
  }
};


/**
 * Obtener detalles de un producto por ID
 * @param {string} productId - ID del producto
 * @returns {Object} Detalles del producto
 */

// Obtener detalles de un producto por su ID
export const fetchProductDetail = async (productId) => {
  try {
    

    const response = await axios.get(`${API_URL}/products/${productId}`, {
    });

    const { name, price, description, images, meta } = response.data;

    if (!name || !price || !description || !images) {
      throw new Error("El backend devolvió datos incompletos del producto.");
    }

    return { name, price, description, images, meta };
  } catch (error) {
    console.error("Error al obtener el detalle del producto:", error.message);
    throw error;
  }
};
