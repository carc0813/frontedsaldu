import React, { useEffect } from "react";

import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { fetchProductsAction } from "../redux/actions/productActions";
//import { Link } from "react-router-dom";

const ProductsList = () => {
  const dispatch = useDispatch();

  // Obtener datos del estado global
  const { products, error } = useSelector((state) => state.products);
  //const { token, role, id_user } = useSelector((state) => state.auth);

  // Obtener los productos cuando haya token y role
  useEffect(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

  // Renderizar un mensaje si ocurre un error
  if (error) {
    return (
      <div className="error-message">
        Error al cargar los productos: {error}
      </div>
    );
  }

  // Renderizar la lista de productos o un mensaje en caso de no tener productos
  return (
    <Grid 
  container 
  spacing={4} 
  sx={{ 
    padding: 3, 
    backgroundColor: '#f5f5f5', 
    borderRadius: '8px', 
    justifyContent: 'space-between'
  }}
>
  {products && Array.isArray(products) ? (
    products.map((product) => (
      <Grid 
        item 
        xs={12} sm={6} md={4} lg={3} 
        key={product.id} 
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <ProductCard product={product} />
      </Grid>
    ))
  ) : (
    <p>Cargando productos o no hay disponibles.</p>
  )}
</Grid>

  );
};

export default ProductsList;
