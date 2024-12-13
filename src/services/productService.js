
import axios from "axios";



const API_URL = "http://localhost:8080";


export const fetchProductsByRole = async ( page = 1, limit = 12) => {
  try {
    // Verificar y obtener el token desde el almacenamiento
    const token = localStorage.getItem('authToken'); // Recuperar el token
    const role = localStorage.getItem('userRole');//Recuperar el Rol 
    if (!token) {
      throw new Error("Token de autenticación no disponible.");
    }

    // Determinar la ruta según el rol del usuario
    const rute = getProductsEndpoint(role);

    // Hacer la solicitud al backend
    const response = await axios.get(rute, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
      },
      params: {
        page, // Página actual
        limit, // Número de elementos por página
        role
      },
    });

   // console.log("Datos completos recibidos del backend:", response.data);
   
    // Formatear los datos recibidos
    const products = formatProducts(response.data.productsData);
   // console.log({ page, limit, products, totalPages:response.data.totalPages });
    // Retornar productos y datos de paginación
    return {
     
      products,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage,
      
    };
  

  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
    throw error; // Lanza el error para manejarlo en el frontend
  }
};

// Función para determinar la ruta según el rol
const getProductsEndpoint = (role) => {
  if (role === "vendedor") {
    return `${API_URL}/products/user`;
  }
  return `${API_URL}/products`; // Ruta por defecto para otros roles
};



// Función para formatear productos
const formatProducts = (productsData) => {
  return productsData.map((product) => {
    const { id, name, description, status, price, images, stock_status } = product;

    // Formatear las imágenes asociadas al producto
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
};



/**
 * Obtener detalles de un producto por ID
 * @param {string} productId - ID del producto
 * @returns {Object} Detalles del producto
 */

// Obtener detalles de un producto por su ID
// Custom Hook para obtener el detalle del producto

// Acción para obtener los detalles de los productos
export const fetchProductDetailsFromAPI = async (token, productId = null) => {
  try {
    if (!token) {
      throw new Error("Token no proporcionado. Asegúrate de que el usuario esté autenticado.");
    }

    const endpoint = productId
      ? `${API_URL}/products/${productId}`
      : `${API_URL}/products`;

   // console.log("Llamando a la API en el endpoint:", endpoint, "con token:", token);

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const products = productId ? [response.data] : response.data;

    const productDetails = products.map((product) => ({
      product_id: product.id,
      name: product.name,
      quantity: product.stock || product.quantity || 0,
      price: parseFloat(product.price).toFixed(2),
    }));

    return productDetails;
  } catch (error) {
    console.error("Error al obtener los detalles de los productos:", error);
    throw new Error(error.response?.data?.message || "Error al cargar productos");
  }
};
