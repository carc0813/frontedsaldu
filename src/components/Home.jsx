import React, { useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../redux/actions/productActions";
import ProductList from "./ProductList";
import ProductManager from "../components/ProductManager"; // Importa ProductManager
import Navbar  from "./Navbar";



const Home = () => {
  const dispatch = useDispatch();
  // Estado global: autenticación y productos
  const { user, isAuthenticated, token,role} = useSelector((state) => state.auth);  
  const { products,error } = useSelector((state) => state.products);
 
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
      <Navbar />
      <h1>Bienvenido, {role}</h1>

      {/* Mostrar ProductManager solo si el usuario es administrador */}
      {role && role === 'admin' && (
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Gestión de Productos
          </Typography>
          <ProductManager /> {/* Aquí agregas el componente ProductManager */}
        </Box>
      )}

      {error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <ProductList products={products} />
        </>
      )}
    </Box>

  );
};

export default Home;