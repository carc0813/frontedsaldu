// import React, { useEffect } from "react";
// import { Grid, Box, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import ProductCard from "./ProductCard";
// import PaginationComponent from "./PaginationComponent";
// import { fetchProductsAction } from "../redux/actions/productActions";

// const ProductsList = () => {
//   const dispatch = useDispatch();
//   const { role } = useSelector((state) => state.auth);
//   // Datos desde Redux
//   const { products, totalPages, page } = useSelector((state) => state.products);

//   const limit = 12; // Productos por página

//   // Cargar productos cuando cambie la página
//   useEffect(() => {
//     dispatch(fetchProductsAction(page, limit));
//   }, [dispatch, page, limit]);

//   // Manejador de cambio de página
//   const handlePageChange = (event, selectedPage) => {
//     dispatch({ type: "SET_CURRENT_PAGE", payload: selectedPage });
//     dispatch(fetchProductsAction(selectedPage, limit));
//   };

//   return (
//     <Box>
//     <Typography variant="h4">
//       Productos {role === "admin" ? "de Todos" : "Propios"}
//     </Typography>
//     <Grid container spacing={2}>
//       {Array.isArray(products) && products.length > 0 ? (
//         products.map((product) => (
//           <Grid item key={product.id} xs={12} sm={6} md={4}>
//             <ProductCard product={product} />
//           </Grid>
//         ))
//       ) : (
//         <Typography variant="body1">No se encontraron productos.</Typography>
//       )}
//     </Grid>
//     <PaginationComponent
//       currentPage={page}
//       totalPages={totalPages}
//       onPageChange={handlePageChange}
//     />
//   </Box>
//   );
// };

// export default ProductsList;

import React, { useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import PaginationComponent from "./PaginationComponent";
import { fetchProductsAction } from "../redux/actions/productActions";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  // Datos desde Redux
  const { products, totalPages, page } = useSelector((state) => state.products);

  const limit = 12; // Productos por página

  // Cargar productos cuando cambie la página
  useEffect(() => {
    dispatch(fetchProductsAction(page, limit));
  }, [dispatch, page, limit]);

  // Manejador de cambio de página
  const handlePageChange = (event, selectedPage) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: selectedPage });
    dispatch(fetchProductsAction(selectedPage, limit));
  };

  return (
    <Box>
      <Typography variant="h4">
        Productos {role === "admin" ? "de Todos" : "Propios"}
      </Typography>
      {<Grid container spacing={2}>
      {Array.isArray(products) && products.length > 0 ? (
         products.map((product) => (
           <Grid item key={product.id} xs={12} sm={6} md={4}>
             <ProductCard product={product} />
           </Grid>
        ))
       ) : (
         <Typography variant="body1">No se encontraron productos.</Typography>
       )}
    </Grid> }
      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default ProductsList;