
import React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2, padding: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.images[0]?.src || "/placeholder.jpg"}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <Typography variant="h6" color="primary" mt={2}>
          ${product.price || "No disponible"}
        </Typography>
      </CardContent>
      <Button variant="contained" color="primary" fullWidth>
        Ver Producto
      </Button>
    </Card>
  );
};

export default ProductCard;