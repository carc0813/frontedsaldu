import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import Login from "./components/Login";
import ProductDetail from "./components/ProductDetail";
import { Navigate } from "react-router-dom"; // Para redirigir al login si no está autenticado
import ProductManager  from "./components/ProductManager";
 // Asegúrate de que role esté en el estado de Redux
const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role); // Obtener el rol del usuario
  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Home /> : <Navigate to="/login" />, // Redirige a login si no está autenticado
    },
    {
      path: "/products/:id",
      element: isAuthenticated ? <ProductDetail /> : <Navigate to="/login" />, // Redirige a login si no está autenticado
    },
    {
      path: "/login", // Ruta para login
      element: !isAuthenticated ? <Login /> : <Navigate to="/" />, // Si está autenticado, redirige a home
    },
     // Ruta para la gestión de productos, solo accesible si el usuario es admin
     {
      path: "/product-manager",
      element: isAuthenticated && role === "admin" ? <ProductManager /> : <Navigate to="/" />, // Redirige a home si no es admin
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

