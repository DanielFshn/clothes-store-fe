import { Box, Typography, Alert } from "@mui/material";
import CategoryForm from "./CategoryForm";
import { categoryCreationDTO } from "./category.model";
import axios from "axios";
import { urlCreateCategory } from "../../Config/endpoinst";
import { AlertTitle } from "@mui/material";
import { useState } from "react";
import { createBrowserHistory } from "history";
//import { useNavigate } from 'react-router-dom';

export default function CreateCategory() {
  //const navigate = useNavigate();
  let history = createBrowserHistory();
  const [error, setError] = useState<string | null>(null);
  async function create(category: categoryCreationDTO) {
    try {
      var result = await axios.post(urlCreateCategory, category);
      console.log(result);
      setError(null);
      history.push("./categories");
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
