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
      path: "/", // Ruta raíz
      element: isAuthenticated ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: "/login", // Ruta de login
      element: !isAuthenticated ? <Login /> : <Navigate to="/" />,
    },
    {
      path: "/products/:id", // Detalle de productos
      element: isAuthenticated ? <ProductDetail /> : <Navigate to="/login" />,
    },
    {
      path: "/product-manager", // Gestión de productos
      element:  isAuthenticated && role === "administrator" ? (
        <ProductManager />
      ) : (
        <Navigate to="/" />
      ),
    },
    {
      path: "*", // Ruta para no encontradas
      element: <div>Página no encontrada</div>,
    },
  ]);
  
  return <RouterProvider router={router} />;
};

export default App;

