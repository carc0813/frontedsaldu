import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { fetchAdminProductsAction } from "../redux/actions/productActions";
import Navbar from "./Navbar";

const SellerProductPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAdminProductsAction());
  }, [dispatch]);

  return (
    <Box>
      <Navbar />
      <Typography variant="h4" gutterBottom>
        Productos del Vendedor 
      </Typography>

      <Grid container spacing={2}>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} showDetailsOnly />
            </Grid>
          ))
        ) : (
          <Box textAlign="center" mt={4}>
            <Typography variant="body1">No hay productos disponibles.</Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default SellerProductPage;
