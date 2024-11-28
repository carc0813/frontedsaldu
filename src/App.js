
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import Login from "./components/Login";
import ProductDetail from "./components/ProductDetail";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Login />;
};

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/products/:id",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <ProductDetail />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
