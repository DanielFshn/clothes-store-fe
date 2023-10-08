import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Snackbar,
  TablePagination,
  Typography,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { urlDeleteCategory, urlGetCategories } from "../../Config/endpoinst";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Uitls/LoadSpinner";
import { compose } from "@mui/system";

interface Category {
  name: string;
  id: string;
}

export default function IndexCategories() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  const [error, setError] = useState<string[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [totalRecords, setTotalRecords] = useState(0);
  //confirm dialog box
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  function openDeleteDialog(categoryId: string) {
    setCategoryToDelete(categoryId);
    setDeleteDialogOpen(true);
  }
  function closeDeleteDialog() {
    setCategoryToDelete(null);
    setDeleteDialogOpen(false);
  }

  const fetchCastegories = async () => {
    try {
      const response = await axios.get(`${urlGetCategories}`, {
        params: { Page: page, RecordsPerPage: rowsPerPage }, // Pass pagination parameters
      });
      setCategories(response.data.data);
      setTotalRecords(response.data.totalRecords);
    } catch (error) {
      // Handle error
      console.error("Error fetching categories:", error);
    }
  };

  React.useEffect(() => {
    fetchCastegories();
  }, [page, rowsPerPage]);

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
    // Simulate an asynchronous operation (e.g., loading data) with a timeout
    setTimeout(() => {
      setLoading(false); // Set loading to false when done loading
    }, 1000); // Adjust the timeout as needed
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
            Categories
          </Typography>
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
              rowsPerPageOptions={[1,5, 10, 25, 100]}
              component="div"
              count={totalRecords}
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
        <DialogTitle id="alert-dialog-title">Delete Category</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this category?
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
                  .put(`${urlDeleteCategory}?CategoryId=${categoryToDelete}`)
                  .then((response) => {
                    setSuccessMessage("Category is deleted succesfully");
                    closeDeleteDialog();
                    setError([]);
                    setSnackbarOpen(true);
                    fetchCastegories();
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
    navigate(`/category/edit/${categoryId}`);
  }

  function handleDeleteCategory(categoryId: string) {
    openDeleteDialog(categoryId);
  }
}
