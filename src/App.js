import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import Login from "./components/Login";
import ProductDetail from "./components/ProductDetail";
import { Navigate } from "react-router-dom"; // Para redirigir al login si no está autenticado

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
  ]);

  return <RouterProvider router={router} />;
};

export default App;

