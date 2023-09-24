import React, { useState } from "react";
import { Box, Typography, Alert } from "@mui/material";
import ProductForm from "./ProductForm"; // Create a new form component for adding products
import { productCreationDTO } from "./product.model"; // Create a model for product creation
import axios from "axios";
import { urlCreateProduct } from "../../Config/endpoinst"; // Update the API endpoint
import { AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  async function create(product: productCreationDTO) {
    try {
      var result = await axios.post(urlCreateProduct, product); // Use the updated API endpoint for product creation
      if (result.data && result.data.Message) {
        setSuccessMessage(result.data.Message);
      } else {
        setSuccessMessage("Product created successfully!");
      }
      setError(null);
      navigate("./products", { state: { successMessage } });
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
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <Box mt={3} textAlign="center">
        <Typography variant="h6" align="center">
          Create Product
        </Typography>
      </Box>
      <ProductForm
        model={{
          name: "",
          description: "",
          price: 0,
          quantity: 0,
          imageUrl: "",
          categoryId: "",
          genderId: "",
          sizeId: "",
        }}
        onSubmit={async (value: any) => {
          await create(value);
        }}
      />
    </div>
  );
}
