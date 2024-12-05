
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const API_URL = "http://localhost:8080";

const token = localStorage.getItem('authToken'); // Recuperar el token
const role = localStorage.getItem('userRole');//Recuperar el Rol 


//console.log("Rol del usuario:", role);
// Función para obtener todos los productos
export const fetchProductsByRole= async (page = 1, limit = 12) => {
  try {
    let rute = `${API_URL}/products`;
    // console.log("Gamma ========> role:",role)
    if (role === "vendedor") {
      rute = `${API_URL}/products/user`;
    }
    const response = await axios.get(`${rute}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
      },
      params: {
        page, // Página actual
        limit // Número de elementos por página
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
