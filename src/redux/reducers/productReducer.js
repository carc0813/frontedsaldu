import {
  FETCH_PRODUCTS_SUCCESS,
  SET_CURRENT_PAGE,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_ERROR, // Solo una vez
  CLEAR_PRODUCTS,
  LOAD_PRODUCTS_BY_ROLE,
} from "../actions/productActions";

const initialState = {
  products: [],
  page: 1, // Usamos "page" como la página actual
  totalPages: 1,
  productDetail: null,
  error: null,
  errorDetaill: null,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      console.log("productos", action.payload.page);
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page || state.page, // Página actual
        totalPages: action.payload.totalPages,
        error: null,
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
        totalPages: 0,
      };
    case SET_CURRENT_PAGE: // Manejar el cambio de página actual
      return {
        ...state,
        page: action.payload,
      };
    case FETCH_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productDetail: action.payload,
      };
    case FETCH_PRODUCT_DETAIL_ERROR:
      return {
        ...state,
        errorDetaill: action.payload,
      };
    case CLEAR_PRODUCTS:
      return {
        ...state,
         products: [] 
        };
    case LOAD_PRODUCTS_BY_ROLE:
      return { ...state,
        products: action.payload.products,
        page: action.payload.page || state.page,
        totalPages: action.payload.totalPages || 1,
        error: null, // Limpia errores previos
       
         };
    default:
      return state;
  }
}
