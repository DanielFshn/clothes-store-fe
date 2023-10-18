import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Alert,
  Grid,
  Snackbar,
  TablePagination,
  Typography,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import {
  urlGetOrdersById,
} from "../../Config/endpoinst";
import LoadingSpinner from "../../Uitls/LoadSpinner";
import { OrdersDTO } from "./Orders";
import AuthenticationContext from "../../Auth/AuthenticationContext";

export default function IndexOrders() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  const [orders, setOrders] = React.useState<OrdersDTO[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { claims } = useContext(AuthenticationContext);

  React.useEffect(() => {
    const userIdClaim = claims.find((claim) => claim.name === "nameid");
    if (userIdClaim) {
      const userId = userIdClaim.value;

      axios
        .get(`${urlGetOrdersById}?id=${userId}`)
        .then((response: AxiosResponse<OrdersDTO[]>) => {
          setOrders(response.data);
          console.log(response.data);
        });
    }
  },[]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {loading ? ( // Render the LoadingSpinner when loading is true
        <LoadingSpinner />
      ) : null}
      <br />
      <br />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <Typography variant="h4" align="center" gutterBottom>
            My Orders
          </Typography>
          <Paper sx={{ width: "100%", overflow: "auto", marginTop: 2 }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>UnitPrice</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    
                  {orders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => (
                      <TableRow key={order.quantity}>
                        <TableCell>{order.productName}</TableCell>
                        <TableCell>{order.address}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>{order.unitPrice}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={error.length > 0 ? "error" : "success"}
        >
          {successMessage === null ? "An error occurred!" : successMessage}
        </Alert>
      </Snackbar>
    </div>
  );

}
