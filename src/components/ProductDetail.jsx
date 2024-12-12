import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductDetail,
  selectProductDetailError,
  selectProductDetailLoading,
} from "../services/productSelectors";
import { fetchProductDetail } from "../redux/actions/productActions";
import { useNavigate } from "react-router-dom";

const ProductDetail = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetail = useSelector(selectProductDetail);
  const error = useSelector(selectProductDetailError);
  const loading = useSelector(selectProductDetailLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(id)); // Llamar a la acción para cargar los detalles
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" padding={4}>
        <Typography color="error">Error al cargar el producto: {error}</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/")}>Volver a la página principal</Button>
      </Box>
    );
  }

  if (!productDetail) {
    return <div>Cargando detalles del producto...</div>;
  }

  const { name, description, price, images } = productDetail;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={4}>
      <img
        src={Array.isArray(images) && images.length > 0 ? images[0].src : "/placeholder.jpg"}
        alt={name || "Producto"}
        style={{ maxWidth: "300px", borderRadius: "8px", marginBottom: "16px" }}
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        style={{ marginTop: "16px" }}
      >
        Volver a la página principal
      </Button>
    </Box>
  );
};

export default ProductDetail;

