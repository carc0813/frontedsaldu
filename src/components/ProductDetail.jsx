
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product; // Recuperar el producto del estado de navegación

  const handleBack = () => {
    navigate("/"); // Volver a la página principal
  };

  if (!product) {
    return (
      <Typography variant="h6" color="error" textAlign="center" marginTop={2}>
        No se encontraron detalles del producto.
      </Typography>
    );
  }

  const { name, description, price, images } = product;

  return (
    <Card sx={{ maxWidth: 345, width: "100%", margin: "auto", padding: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={images[0]?.src || "https://via.placeholder.com/200"}
        alt={images[0]?.alt || "Producto sin imagen"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
          {description}
        </Typography>
        <Typography variant="h6" color="primary">
          Precio: ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary" onClick={handleBack}>
          Volver
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductDetail;
