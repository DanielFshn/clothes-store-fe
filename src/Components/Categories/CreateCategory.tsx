import { Box, Typography, Alert } from "@mui/material";
import CategoryForm from "./CategoryForm";
import { categoryCreationDTO } from "./category.model";
import axios from "axios";
import { urlCreateCategory } from "../../Config/endpoinst";
import { AlertTitle } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateCategory() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  async function create(category: categoryCreationDTO) {
    try {
      var result = await axios.post(urlCreateCategory, category);
      if (result.data && result.data.Message) {
        // Set the success message from the response
        setSuccessMessage(result.data.Message);
      } else {
        // Set a default success message if the response doesn't contain one
        setSuccessMessage("Category created successfully!");
      }
      console.log(result);
      setError(null);
      navigate("./categories", { state: { successMessage } });
    } catch (error: any) {
      if (error.response) {
        const errorResponse = error.response.data;
        const errorMessage = `${errorResponse.detail}`;
        setError(errorMessage);
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
      <Box mt={3} textAlign="center">
        <Typography variant="h6" align="center">
          Create Category
        </Typography>
      </Box>
      <CategoryForm
        model={{ name: "" }}
        onSubmit={async (value) => {
          await create(value);
        }}
      ></CategoryForm>
    </div>
  );
}
