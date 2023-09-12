import { Box, Typography, Alert } from "@mui/material";
import axios from "axios";
import { AlertTitle } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { genderCreationDTO } from "./gender.model";
import { urlCreateGender } from "../../Config/endpoinst";
import GenderForm from "./GenderForm";

export default function CreateGender() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  async function create(gender: genderCreationDTO) {
    try {
      var result = await axios.post(urlCreateGender, gender);
      if (result.data && result.data.Message) {
        // Set the success message from the response
        setSuccessMessage(result.data.Message);
      } else {
        // Set a default success message if the response doesn't contain one
        setSuccessMessage("Gender created successfully!");
      }
      console.log(result);
      setError(null);
      navigate("./genders", { state: { successMessage } });
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
          Create Gender
        </Typography>
      </Box>
      <GenderForm
        model={{ name: "" }}
        onSubmit={async (value) => {
          await create(value);
        }}
      ></GenderForm>
    </div>
  );
}
