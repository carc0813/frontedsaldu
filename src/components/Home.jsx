import React, { useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../redux/actions/productActions";
import ProductList from "./ProductList";

const Home = () => {
  const dispatch = useDispatch();
  // Estado global: autenticación y productos
  const { user, isAuthenticated, token } = useSelector((state) => state.auth);
  const { products, error } = useSelector((state) => state.products);

  // Efecto para cargar productos según el usuario autenticado
  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(fetchProductsAction(token, user)); // Pasa el rol y el ID del usuario
    }
  }, [dispatch, isAuthenticated, token, user]);


  if (!products) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Si no está autenticado, mostramos un mensaje
  if (!isAuthenticated)
    return <p>No estás autenticadoPor favor, inicia sesión.</p>;

  return (
    <Box padding={3}>
    <Typography variant="h3" gutterBottom>
      Lista de Productos
    </Typography>
    {error ? (
      <Typography color="error">{error}</Typography>
    ) : (
      <ProductList products={products} />
    )}
  </Box>
  );
};

export default Home;