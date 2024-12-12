import {
  fetchProductsByRole,
  fetchProductDetailsFromAPI
} from "../../services/productService";

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";
export const FETCH_PRODUCT_DETAIL_SUCCESS = "FETCH_PRODUCT_DETAIL_SUCCESS";
export const FETCH_PRODUCT_DETAIL_ERROR = "FETCH_PRODUCT_DETAIL_ERROR";
export const SET_CURRENT_PAGE="SET_CURRENT_PAGE,";
export const  CLEAR_PRODUCTS="CLEAR_PRODUCTS";
export const LOAD_PRODUCTS_BY_ROLE="LOAD_PRODUCTS_BY_ROLE";




export const fetchProductsAction = (page = 1, limit = 12) => {
  return async (dispatch) => {
    try {
      console.log("Fetching products for page:", page, "with limit:", limit);
      // Llamada a fetchProductsByRole, que devuelve productos y datos de paginación
      const {products, totalPages, page: currentPage} =  await fetchProductsByRole(page, limit);
      console.log("Datos de productos recibidos:", { products, totalPages, page });
      // Dispatch para actualizar el estado global
      // //console.log("Datos enviados al reducer:", {
      //   products,
      //   page,
      //   totalPages,
      // });
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: {
          products,
          page, // Página actual desde el servidor
          totalPages
        },
      });
    } catch (error) {
      console.error("Error al obtener los productos:", error.message);
      dispatch({
        type: FETCH_PRODUCTS_ERROR,
        payload: error.message, // Enviar el error al estado global
      });
    }
  };
};


// Acción para establecer la página actual
export const setCurrentPage = (page) => {
  if (typeof page !== "number" || page < 1) {
    console.error("Número de página inválido:", page);
    return { type: SET_CURRENT_PAGE, payload: 1 }; // Valor por defecto en caso de error
  }

  return { type: SET_CURRENT_PAGE, payload: page };
};

/**
 * Acción para obtener detalle de un producto
 * @param {string} productId - ID del producto
 *
 */


// Acción para obtener los detalles del producto

export const fetchProductDetail = (productId = null) => async (dispatch) => {
  try {
    console.log("fetchProductDetail llamada con productId:", productId);

    // Obtén el token desde localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token no encontrado. Usuario no autenticado.");
    }

    const productDetails = await fetchProductDetailsFromAPI(token, productId);

    console.log("Detalles obtenidos:", productDetails);

    dispatch({
      type: FETCH_PRODUCT_DETAIL_SUCCESS,
      payload: productDetails,
    });
  } catch (error) {
    console.error("Error al obtener el detalle del producto:", error);

    dispatch({
      type: FETCH_PRODUCT_DETAIL_ERROR,
      payload: error.message || "Error al cargar los detalles del producto",
    });
  }
};

export const clearProducts = () => ({ type: CLEAR_PRODUCTS });
export const loadProductsByRole = (role) => async (dispatch) => {
  try {
    const products = await fetchProductsByRole(role); // Simula llamada a una API
    dispatch({ type: LOAD_PRODUCTS_BY_ROLE, payload: products });
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
};

