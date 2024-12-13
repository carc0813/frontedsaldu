
import React, { useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import PaginationComponent from "./PaginationComponent";
import { fetchProductsAction, setCurrentPage, } from "../redux/actions/productActions";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  // Datos desde Redux
  const { products, totalPages, page } = useSelector((state) => state.products);
   // Maneja valores indefinidos con un valor predeterminado
   const currentPage = page || 1;
  const limit = 12; // Productos por página

  // Cargar productos cuando cambie la página
  useEffect(() => {
    if (page) {
    //  console.log("Disparando fetchProductsAction para la página:", page);
      dispatch(fetchProductsAction(page, limit));
    }
  }, [dispatch, page]);

  // Manejador de cambio de página
  const handlePageChange = (event, selectedPage) => {
  //  console.log("Cambiando a la página:", selectedPage); // Verifica que el valor de la página es correcto
    dispatch(setCurrentPage(selectedPage));
  };

  return (
    <Box>
      <Typography variant="h4">
        Productos {role === "admin" ? "de Todos" : "Propios"}
      </Typography>
      {<Grid container spacing={2}>
      {Array.isArray(products) && products.length > 0 ? (
         products.map((product) => (
           <Grid item key={product.id} xs={12} sm={6} md={4}>
             <ProductCard product={product} />
           </Grid>
        ))
       ) : (
         <Typography variant="body1">No se encontraron productos.</Typography>
       )}
    </Grid> }
      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default ProductsList;