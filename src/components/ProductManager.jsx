import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const ProductManager = () => {
  const [products, setProducts] = useState([]); // Lista de productos
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    image: "",
  }); // Datos del formulario
  const [editing, setEditing] = useState(false); // Estado para diferenciar crear y actualizar

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Crear o actualizar producto
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === formData.id ? { ...formData } : product
        )
      );
      setEditing(false);
    } else {
      setProducts((prev) => [
        ...prev,
        { ...formData, id: Date.now() }, // Crear un nuevo producto con ID único
      ]);
    }
    setFormData({ id: null, name: "", description: "", price: "", image: "" }); // Limpiar formulario
  };

  // Eliminar producto
  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  // Editar producto
  const handleEdit = (product) => {
    setFormData(product);
    setEditing(true);
  };

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        Gestión de Productos
      </Typography>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          label="Precio"
          name="price"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          required
        />
        <TextField
          label="URL de la Imagen"
          name="image"
          value={formData.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {editing ? "Actualizar Producto" : "Crear Producto"}
        </Button>
      </form>

      <Divider sx={{ marginY: 4 }} />

      {/* Lista de Productos */}
      <Typography variant="h5" gutterBottom>
        Lista de Productos
      </Typography>
      <List>
        {products.map((product) => (
          <ListItem
            key={product.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ListItemText
              primary={product.name}
              secondary={`Precio: $${product.price}`}
            />
            <Box>
              <IconButton color="primary" onClick={() => handleEdit(product)}>
                <Edit />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => handleDelete(product.id)}
              >
                <Delete />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      {products.length === 0 && (
        <Typography textAlign="center" color="textSecondary">
          No hay productos disponibles.
        </Typography>
      )}
    </Box>
  );
};

export default ProductManager;
