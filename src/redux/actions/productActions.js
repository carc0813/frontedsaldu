import {
  fetchProductsByRole,
  useProductDetail,
} from "../../services/productService";

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";
export const FETCH_PRODUCT_DETAIL_SUCCESS = "FETCH_PRODUCT_DETAIL_SUCCESS";
export const FETCH_PRODUCT_DETAIL_ERROR = "FETCH_PRODUCT_DETAIL_ERROR";
export const SET_CURRENT_PAGE="SET_CURRENT_PAGE,";

export const fetchProductsAction = (page = 1, limit = 12) => {
  return async (dispatch) => {
    try {
      // Llamada a fetchProductsByRole, que devuelve productos y datos de paginación
      const {products, totalPages, page: currentPage} =  await fetchProductsByRole(page, limit);

      // Dispatch para actualizar el estado global
      console.log("Datos enviados al reducer:", {
        products,
        page,
        totalPages,
      });
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: {
          products,
          page,
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
export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});



/**
 * Acción para obtener detalle de un producto
 * @param {string} productId - ID del producto
 *
 */


// Acción para obtener los detalles del producto
export const fetchProductDetailAction = (productId) => {
  return async (dispatch) => {
    try {
      // Llamar al servicio que obtiene los detalles del producto
      const productDetail = await useProductDetail(productId);

      // Dispatch para actualizar el estado global con el detalle del producto
      dispatch({
        type: FETCH_PRODUCT_DETAIL_SUCCESS,
        payload: productDetail,
      });
    } catch (error) {
      // Manejo de error
      console.error("Error al obtener el detalle del producto:", error.message);

      // Dispatch para indicar el error al obtener el detalle
      dispatch({
        type: FETCH_PRODUCT_DETAIL_ERROR,
        payload: error.message,
      });
    }
  };
};
