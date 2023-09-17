import React, { useState } from "react";
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
import { Box, Grid, TablePagination } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { urlGetCategories } from "../../Config/endpoinst";
import { useNavigate } from "react-router-dom";

interface Category {
  name: string;
  id: string;
}

export default function IndexCategories() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const test = 10;
  const fetchCastegories = async () => {
    try {
      const response = await axios.get(`${urlGetCategories}`, {
        params: { Page : page , RecordsPerPage: rowsPerPage }, // Pass pagination parameters
      });
      setCategories(response.data);
    } catch (error) {
      // Handle error
      console.error("Error fetching categories:", error);
    }
  };

  React.useEffect(() => {
    fetchCastegories();
  },[page,rowsPerPage]);


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <br />
      <br />
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
              rowsPerPageOptions={[5,10, 25, 100]}
              component="div"
              count={11}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );

  function handleEditCategory(categoryId: string) {
    console.log(`Editing category with ID: ${categoryId}`);
    navigate(`/category/edit/${categoryId}`);
  }

  function handleDeleteCategory(categoryId: string) {
    console.log(`Deleting category with ID: ${categoryId}`);
  }
}
