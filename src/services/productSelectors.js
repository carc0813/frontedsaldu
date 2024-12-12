import { createSelector } from "reselect";

const selectProductDetailState = (state) => state.productDetail || {};

// Selector memoizado para el detalle del producto
export const selectProductDetail = createSelector(
  [selectProductDetailState],
  (productDetail) => productDetail
);

// Selector para el error
export const selectProductDetailError = createSelector(
  [selectProductDetailState],
  (productDetail) => productDetail.error
);

// Selector para el loading
export const selectProductDetailLoading = createSelector(
  [selectProductDetailState],
  (productDetail) => productDetail.loading
);
