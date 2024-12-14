import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import axios from "axios";
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
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate(); // Hook para navegación

  const API_URL = "http://localhost:8080"; // Cambia por tu URL de la API

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Token no encontrado.");
        return;
      }
  
      const response = await axios.get(`${API_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Verifica si los datos están en response.data.productsData
      const productsList = response.data.productsData || []; 
      console.log("Productos cargados:", productsList);
  
      setProducts(productsList);
      setFilteredProducts(productsList);
    } catch (error) {
      console.error("Error al obtener productos:", error.response || error.message);
    }
  };
  
  

  // Obtener todos los productos
  useEffect(() => {
    fetchProducts();
  }, []);

  
  // Función para manejar los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para guardar o actualizar el producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${API_URL}/${formData.id}`, formData);
        fetchProducts();
        setEditing(false);
      } else {
        await axios.post(API_URL, formData);
        fetchProducts();
      }
      setFormData({ id: null, name: "", description: "", price: "", image: "" });
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  // Función para eliminar producto
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  // Función para editar producto
  const handleEdit = (product) => {
    setFormData(product);
    setEditing(true);
  };

  // Función de búsqueda de productos por nombre o ID
  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery) ||
      product.id.toString().includes(searchQuery)
    );
    setFilteredProducts(filtered);
  };

  return (
    <Box padding={4}>
      {/* Botón para regresar */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/")} // Redirige a la página principal
        sx={{ marginBottom: 2 }}
      >
        Volver a la Página Principal
      </Button>

      <Typography variant="h4" gutterBottom>
        Gestión de Productos
      </Typography>

      {/* Barra de búsqueda */}
      <TextField
        label="Buscar por nombre o ID"
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />

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

      <Typography variant="h5" gutterBottom>
        Lista de Productos
      </Typography>
      
      <List>
  {filteredProducts && Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
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
    ))
  ) : (
    <Typography textAlign="center" color="textSecondary">
      No hay productos disponibles.
    </Typography>
  )}
</List>

    </Box>
  );
};

export default ProductManager;

