import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`); // Cambiado a plural "products"
  };

  return (
    <Card sx={{ maxWidth: 345, width: "100%" }}>
      <CardMedia
        component="img"
        height="140"
        image={product.images[0]?.src || "https://via.placeholder.com/150"}
        alt={product.images[0]?.alt || "Producto sin imagen"}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            maxHeight: 60,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "block",
          }}
          title={product.description || "Sin descripción disponible"} // Tooltip para texto truncado
        >
          {product.description || "Sin descripción disponible"}
        </Typography>
        <Typography variant="subtitle1" color="primary" sx={{ marginTop: 1 }}>
          Precio: ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={handleViewDetails}
        >
          Ver detalles
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

