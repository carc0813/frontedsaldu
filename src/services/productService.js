
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const API_URL = "http://localhost:8080";

// export const fetchProductsByRole= async (page = 1, limit = 12) => {
//   try {
//     let rute = `${API_URL}/products`;
//     // console.log("Gamma ========> role:",role)
//     if (role === "vendedor") {
//       rute = `${API_URL}/products/user`;
//     }
//     const response = await axios.get(`${rute}`, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
//       },
//       params: {
//         page, // Página actual
//         limit // Número de elementos por página
//       },
//     })
   


//      console.log("Datos completos recibidos del backend:", response.data);

//     // Formatear los productos para mantener solo la información relevante
//     const products = response.data.productsData.map((product) => {
//       const { id, name, description, status, price, images, stock_status } = product;

//       // Verificar si el producto tiene imágenes asociadas
//       const formattedImages = images.map((image) => ({
//         id: image.id,
//         src: image.src,
//         name: image.name,
//         alt: image.alt || "Sin descripción",
//       }));

//       return {
//         id,
//         name,
//         description,
//         status,
//         price,
//         images: formattedImages,
//         stock_status,
//       };
//     });

//     return  {
//       products,
//       totalPages: response.data.totalPages, // Número total de páginas
//       currentPage: response.data.currentPage, // Página actual
//     };
//   } catch (error) {
//     console.error("Error al obtener los productos:", error.message);
//     throw error; // Lanza el error para manejarlo en el frontend
//   }
// };

export const fetchProductsByRole = async (role, page = 1, limit = 12) => {
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

    console.log("Datos completos recibidos del backend:", response.data);

    // Formatear los datos recibidos
    const products = formatProducts(response.data.productsData);

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


export const useProductDetail = (token) => {
  const navigate = useNavigate(); // Hook de navegación
  const { id } = useParams(); // Hook para obtener el id del producto de la URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { name, price, description, images, meta } = response.data;
        console.log(response.data)
        // Validar que los datos son completos
        if (!name || !price || !description || !images) {
          throw new Error("El backend devolvió datos incompletos del producto.");
        }

        setProduct({ name, price, description, images, meta });
      } catch (error) {
        if (error.response?.status === 401) {
          console.error("No autorizado. Redirigiendo al login...");
          navigate("/login");
        } else {
          setError(error.message || "Error desconocido");
          console.error("Error al obtener detalles del producto:", error.message || error);
        }
      }
    };

    fetchProductDetail();
  }, [id, token, navigate]);

  return { product, error };
};
