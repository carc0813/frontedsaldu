import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import ProductFormDialog from "./ProductFormDialog";
import PaginationComponent from "./PaginationComponent";
import {
  fetchProductsAction,
  setCurrentPage,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../redux/actions/productActions";

const ProductManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Estado global y local
  const { products, totalPages, page, loading, error } = useSelector((state) => state.products);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const currentPage = page || 1;
  const limit = 12;

  // Cargar productos
  useEffect(() => {
    dispatch(fetchProductsAction(currentPage, limit));
  }, [dispatch, currentPage]);

  // Abrir el formulario para crear o editar un producto
  const handleOpenDialog = (product = null) => {
    setEditingProduct(product);
    setOpenDialog(true);
  };

  // Guardar o actualizar producto
  const handleSaveProduct = async (productData) => {
    try {
      // Crear el objeto del producto actualizado
      const updatedProduct = {
        name: productData.name,
        price: productData.price,
        description: productData.description,
        status: productData.status || "draft",
      };
  
      // Manejo de imágenes
      const existingImages = editingProduct?.images || []; // Imágenes ya existentes
      const newImages = productData.newImages || []; // Nuevas imágenes seleccionadas
  
      // Combinar imágenes existentes con nuevas
      const allImages = [...existingImages, ...newImages]; // Fusiona las imágenes
      updatedProduct.images = allImages; // Asignar las imágenes combinadas
  
      console.log("Producto actualizado:", updatedProduct);
  
      // Verificar si se está editando o creando un producto
      if (editingProduct && editingProduct.id) {
        await dispatch(updateProduct(editingProduct.id, updatedProduct)); // Actualizar producto
      } else {
        await dispatch(createProduct(updatedProduct)); // Crear nuevo producto
      }
  
      // Recargar productos después de la acción
      await dispatch(fetchProductsAction(currentPage, limit));
  
      // Cerrar el diálogo y restablecer el estado
      setOpenDialog(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };
  

  // Eliminar producto
  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId)).then(() => {
      dispatch(fetchProductsAction(currentPage, limit));
    });
  };

  // Cambiar página
  const handlePageChange = (event, newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  // Volver a inicio
  const handleBackToHome = () => {
    navigate("/");
  };

  // Renderizado del componente
  return (
    <Box>
      <Navbar />
      <Typography variant="h4" gutterBottom>
        Gestión de Productos
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
          Crear Producto
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleBackToHome}>
          Volver a la Página Principal
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={2}>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <ProductCard
                  product={product}
                  onEdit={() => handleOpenDialog(product)}
                  onDelete={() => handleDeleteProduct(product.id)}
                />
              </Grid>
            ))
          ) : (
            <Box textAlign="center" mt={4}>
              <Typography variant="body1">No hay productos disponibles.</Typography>
            </Box>
          )}
        </Grid>
      )}

      <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

      <ProductFormDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </Box>
  );
};

export default ProductManager;



