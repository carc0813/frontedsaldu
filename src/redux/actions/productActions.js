
import { fetchProductsByRole, fetchProductDetail } from "../../services/productService";



export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";
export const FETCH_PRODUCT_DETAIL_SUCCESS = "FETCH_PRODUCT_DETAIL_SUCCESS";
export const FETCH_PRODUCT_DETAIL_ERROR = "FETCH_PRODUCT_DETAIL_ERROR";


export const fetchProductsAction = () => {
  return async (dispatch) => {
    try {
      const products = await fetchProductsByRole();

      // Dispatch para actualizar el estado global
      console.log("Datos enviados al reducer:", products);
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: products,
      });
    } catch (error) {
      console.error("Error al obtener los productos:", error.message);
      dispatch({
        type: FETCH_PRODUCTS_ERROR,
        payload: error.message,
      });
    }
  };
};


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
