import { Pagination, Stack } from "@mui/material";

const PaginationComponent = ({ currentPage = 1, totalPages = 1, onPageChange }) => (
    <Stack 
        spacing={2} 
        direction="row" 
        justifyContent="center" 
        alignItems="center" 
        sx={{ marginTop: 2 }}
    >
        <Pagination
        
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
            color="primary"
            shape="rounded"
        />
    </Stack>
);

export default PaginationComponent;







