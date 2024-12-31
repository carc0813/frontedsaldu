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


const ProductCard = ({ product, onEdit, onDelete, showDetailsOnly, hideDetails }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`, { state: { product } });
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
        <Typography variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ maxHeight: 60, overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {product.description || "Sin descripción"}
        </Typography>
        <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
          Precio: ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        {!hideDetails && (
          <Button size="small" variant="outlined" color="secondary" onClick={handleViewDetails}>
            Ver Detalles
          </Button>
        )}
        {!showDetailsOnly && (
          <>
            <Button size="small" variant="outlined" color="primary" onClick={onEdit}>
              Editar
            </Button>
            <Button size="small" variant="outlined" color="error" onClick={onDelete}>
              Eliminar
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;


