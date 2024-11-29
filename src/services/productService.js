
import axios from "axios";

const API_URL = "http://localhost:8080";

const token = localStorage.getItem('authToken'); // Recuperar el token

// Función para obtener todos los productos
export const fetchProductsByRole= async () => {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
      },
    }) // Solicitud al backend



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

    return products; // Retornar los productos formateados
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
