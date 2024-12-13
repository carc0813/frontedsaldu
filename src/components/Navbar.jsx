import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadProductsByRole,
  clearProducts,
} from "../redux/actions/productActions"; // Acciones para cargar y limpiar productos
import {Link} from "@mui/material";

const NavBar = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth); // Obtén el estado del usuario y rol
 
 // console.log(isAuthenticated, role); 
  const navigate = useNavigate();

  // Efecto para cargar productos solo si hay usuario y rol
  useEffect(() => {
    if (user && role) {
      dispatch(loadProductsByRole(role));
    } else {
      dispatch(clearProducts());
    }
  }, [dispatch, user, role]); // Dependencias: cuando cambian user o role, se ejecuta el efecto

  // Función para manejar el logout
  const handleLogout = () => {
    // Limpia los datos del usuario y productos en localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("products");

    // Limpia el estado global del usuario y productos
    dispatch({ type: "LOGOUT_SUCCESS" }); // Limpia el estado global del usuario
    dispatch(clearProducts()); // Limpia los productos cuando el usuario se desloguea

    // Redirige al login
    navigate("/login"); // Redirige al login sin recargar la página
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Nombre de la aplicación */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Saldu
        </Typography>

        {/* Si el usuario está autenticado, muestra el botón de cerrar sesión */}
        {user ? (
          <Button color="inherit" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        ) : (
          // Si no hay usuario, muestra el mensaje para iniciar sesión
          <Typography variant="body1" color="inherit">
            Inicia sesión para gestionar productos
          </Typography>
        )}
      </Toolbar>
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mi Tienda
        </Typography>
        <nav>
        {/* Mostrar el botón solo si el usuario está autenticado y es admin */}
      { role === 'administrator' && (
       <Link to="/product-manager">
          <Button variant="contained" color="primary">
            Gestionar Productos
          </Button>
        </Link>
      )}
    </nav>
      </Toolbar>
    </AppBar>
    </AppBar>
    
  );
};

export default NavBar;
