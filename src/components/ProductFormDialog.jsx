import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const ProductFormDialog = ({ open, onClose, onSave, product }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  // Cargar datos al abrir el diálogo
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
      });
    }

    // Mover el foco al botón Cancelar cuando se abre
    if (open) {
      const cancelButton = document.getElementById("cancel-button");
      if (cancelButton) cancelButton.focus();
    }
  }, [product, open]);

  // Manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar cambios o crear producto
  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }
    onSave(formData);
  };

  // Cerrar el diálogo
  const handleClose = () => {
    onClose();
    document.activeElement.blur(); // Evitar foco en elementos ocultos
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
    >
      <DialogTitle id="dialog-title">
        {product ? "Editar Producto" : "Crear Producto"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
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
        />
        <TextField
          label="URL de la Imagen"
          name="image"
          value={formData.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button id="cancel-button" onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {product ? "Actualizar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormDialog;



