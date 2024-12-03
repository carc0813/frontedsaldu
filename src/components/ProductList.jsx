import React, { useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import PaginationComponent from "./PaginationComponent";
import { fetchProductsAction } from "../redux/actions/productActions";

const ProductsList = () => {
  const dispatch = useDispatch();

  // Datos desde Redux
  const { products, totalPages, page } = useSelector((state) => state.products);

  const limit = 12; // Productos por página

  // Cargar productos cuando cambie la página
  useEffect(() => {
    dispatch(fetchProductsAction(page, limit));
  }, [dispatch, page, limit]);

  // Manejador de cambio de página
  const handlePageChange = (event, selectedPage) => {
    dispatch({ type: "SET_PAGE", payload: selectedPage });
    dispatch(fetchProductsAction(selectedPage, limit));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Productos
      </Typography>

      <Grid
        container
        spacing={4}
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          padding: 3,
          justifyContent: "space-between",
        }}
      >
        {products && products.length > 0 ? (
          products.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={product.id}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No hay productos disponibles.
          </Typography>
        )}
      </Grid>

      {/* Paginación */}
      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default ProductsList;

