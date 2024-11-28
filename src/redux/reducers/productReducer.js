import {
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCT_DETAIL_SUCCESS,
    FETCH_PRODUCT_DETAIL_ERROR, // Solo una vez
  } from "../actions/productActions";
  
  
  const initialState = {
    products: [],
    productDetail: null,
    error: null,
    errorDetaill:null
  };
  
  export default function productReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_PRODUCTS_SUCCESS:
        console.log("productos", action.payload);
        return {
          ...state,
          products: action.payload,
        };
        case FETCH_PRODUCTS_ERROR:
          return {
            ...state,
            error: action.payload,
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
         
      default:
        return state;
    }
  }
  