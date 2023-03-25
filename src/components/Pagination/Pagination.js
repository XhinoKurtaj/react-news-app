import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

const PaginationControlled = ({ currentPage, lastPage, onPageChange }) => (
  <Stack spacing={2} style={{ alignItems: "center" }}>
    <Pagination
      count={lastPage}
      page={currentPage}
      onChange={onPageChange}
      color="primary"
      shape="rounded"
      size="large"
    />
  </Stack>
);

export default PaginationControlled;
