import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "./CategoryForm";
import { Alert, AlertTitle, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { editCategoryDTO } from "./category.model";
import { urlEditCategory, urlGetCategoryById } from "../../Config/endpoinst";
import { useEffect, useState } from "react";
import TestComponent from "../../Uitls/TestComponent";

export default function EditCategory() {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [category, setCategory] = useState<editCategoryDTO>();
  const [error, setErrors] = useState<string | null>(null);
  useEffect(() => {
    axios
      .get(`${urlGetCategoryById}?id=${id}`)
      .then((response: AxiosResponse<editCategoryDTO>) => {
        setCategory(response.data);
      });
  }, [id]);

  async function edit(categoryToEdit: editCategoryDTO) {
    try {
      await axios.put(`${urlEditCategory}/${id}`, categoryToEdit);
      navigate(`/categories`);

      //navigate("/categories");
    } catch (error: any) {
      if (error && error.response) {
        const errorResponse = error.response.data;
        const errorMessage = `${errorResponse.detail}`;
        setErrors(errorMessage);
      }
    }
  }
  return (
    <div>
      {error && ( // Conditional rendering of error message
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <br />
      <Typography variant="h6" align="center">
        Edit Category
      </Typography>
      {category ? (
        <CategoryForm
          model={category}
          onSubmit={async (value) => {
            await edit(value);
          }}
        ></CategoryForm>
      ) : (
        //TestComponent do te zevendesohet psh me nje component te tipit LoadConoponent
        <TestComponent />
      )}
    </div>
  );
}
