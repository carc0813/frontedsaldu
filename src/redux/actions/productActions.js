import {
  fetchProductsByRole,
  fetchProductDetail,
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
      const {products, totalPages, currentPage} =  await fetchProductsByRole(page, limit);

      // Dispatch para actualizar el estado global
      console.log("Datos enviados al reducer:", {
        products,
        page: currentPage,
        totalPages,
      });
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: {
          products,
          page: currentPage,
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

export const setCurrentPage = () => ({
  type: SET_CURRENT_PAGE,
  payload: { products, totalPages, page }
});


/**
 * Acción para obtener detalle de un producto
 * @param {string} productId - ID del producto
 *
 */

export const fetchProductDetailAction = (productId) => {
  return async (dispatch) => {
    try {
      const productDetail = await fetchProductDetail(productId);

      // Dispatch para actualizar el estado global con el detalle del producto
      dispatch({
        type: FETCH_PRODUCT_DETAIL_SUCCESS,
        payload: productDetail.data,
      });
    } catch (error) {
      console.error("Error al obtener el detalle del producto:", error.message);
      dispatch({
        type: FETCH_PRODUCT_DETAIL_ERROR,
        payload: error.message,
      });
    }
  };
};
