import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Snackbar, TablePagination } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { urlDeleteSize, urlSizes } from "../../Config/endpoinst";
import { useNavigate } from "react-router-dom";
import { Size } from "./size.model";
import LoadingSpinner from "../../Uitls/LoadSpinner";


export default function IndexSizes() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  const [categories, setCategories] = React.useState<Size[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  React.useEffect(() => {
    axios
      .get(`${urlSizes}`)
      .then((response: AxiosResponse<Size[]>) => {
        setCategories(response.data);
      });
  });
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function openDeleteDialog(categoryId: string) {
    setCategoryToDelete(categoryId);
    setDeleteDialogOpen(true);
  }
  function closeDeleteDialog() {
    setCategoryToDelete(null);
    setDeleteDialogOpen(false);
  }  
  
  const fetchSizes = async () => {
    try {
      const response = await axios.get(`${urlSizes}`, {
        params: { Page: page, RecordsPerPage: rowsPerPage }, // Pass pagination parameters
      });
      setCategories(response.data);
    } catch (error) {
      // Handle error
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div>
         {loading ? ( // Render the LoadingSpinner when loading is true
    <LoadingSpinner /> )  : (null)};
      <br/>
      <br/>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <Paper sx={{ width: "100%", overflow: "auto", marginTop: 2 }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="edit"
                            color="primary"
                            onClick={() => handleEditCategory(category.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            color="secondary"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={categories.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Size</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this size?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Add your delete logic here
              try {
                 axios
                   .put(`${urlDeleteSize}?Id=${categoryToDelete}`)
                   .then((response) => {
                    setSuccessMessage("Category is deleted succesfully");
                    closeDeleteDialog();
                    setError([]);   
                       setSnackbarOpen(true);
                       fetchSizes();
                   });     
              } catch (error: any) {
                if (error.response) {
                  const errorResponse = error.response.data;
                  const errorMessage = `${errorResponse.detail}`;
                  const initialErrorsArray = errorMessage.split(", ");
                  setError(initialErrorsArray);
                } else {
                  setError(["An error occurred. Please try again later."]);
                }
                setSnackbarOpen(true); // Open the Snackbar
                setSuccessMessage(null);
              }
            }}
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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

  function handleEditCategory(categoryId: string) {
    console.log(`Editing category with ID: ${categoryId}`);
    navigate(`/size/edit/${categoryId}`);

  }

  function handleDeleteCategory(categoryId: string) {
    openDeleteDialog(categoryId);
  }
}
