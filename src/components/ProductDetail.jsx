import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetailAction } from "../redux/actions/productActions";

const ProductDetail = () => {
  const { id } = useParams(); // Obtener ID desde la URL
  const dispatch = useDispatch();

  // Obtener el estado global
  const { productDetail, error } = useSelector(
    (state) => state.productDetail || {}
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetailAction(id));
    }
  }, [dispatch, id]);

  if (error) {
    return <div>Error al cargar el producto: {error}</div>;
  }

  if (!productDetail) {
    return <div>Cargando detalles del producto...</div>;
  }

  const { name, description, price, images } = productDetail;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={4}>
      <img
        src={images[0]?.src || "/placeholder.jpg"}
        alt={name}
        style={{ maxWidth: "300px", borderRadius: "8px" }}
      />
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {description}
      </Typography>
      <Typography variant="h5" color="primary" gutterBottom>
        ${price}
      </Typography>
      <Button variant="contained" color="primary">
        Comprar Ahora
      </Button>
    </Box>
  );
};

export default ProductDetail;
