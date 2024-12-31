import {
  FETCH_PRODUCTS_SUCCESS,
  SET_CURRENT_PAGE,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_ERROR, // Solo una vez
  CLEAR_PRODUCTS,
  LOAD_PRODUCTS_BY_ROLE,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT
} from "../actions/productActions";

const initialState = {
  products: [],
  page: 1, // Usamos "page" como la página actual
  totalPages: 1,
  productDetail: null,
  error: null,
  errorDetaill: null,
  errorUpdate:null
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
     // console.log("Productos obtenidos:", action.payload.products);
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,// Cambiar el estado de la página
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
  //  console.log("Página actual actualizada:", action.payload);
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
       
         }; case CREATE_PRODUCT:
         return {
           ...state,
           products: [...state.products, action.payload],
         };
         case UPDATE_PRODUCT:
          return {
            ...state,
            products: state.products.map((product) =>
              String(product.id) === String(action.payload.id) // Comparación segura
                ? action.payload
                : product
            ),
          };
         case UPDATE_PRODUCT_FAIL:
          return{
            ...state,
            errorUpdate:action.payload,
          }
       case DELETE_PRODUCT:
         return {
           ...state,
           products: state.products.filter((product) => product.id !== action.payload),
         };
    default:
      return state;
  }
}
