import React, { useEffect, useState } from "react";
import { Box, Typography, Alert } from "@mui/material";
import ProductForm from "./ProductForm"; // Create a new form component for adding products
import { CategoryOption, productCreationDTO } from "./product.model"; // Create a model for product creation
import axios from "axios";
import { urlCreateProduct, urlGetCategories, urlGetGenders, urlSizes } from "../../Config/endpoinst"; // Update the API endpoint
import { AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [genders, setGenders] = useState([]);
  const [sizes, setSizes] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories from the API
        const categoriesResponse = await axios.get(urlGetCategories);
        setCategories(categoriesResponse.data.data);
  
        // Fetch genders from the API
        const gendersResponse = await axios.get(urlGetGenders);
        setGenders(gendersResponse.data);
  
        // Fetch sizes from the API
        const sizesResponse = await axios.get(urlSizes);
        setSizes(sizesResponse.data);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  

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
          category: categories.length > 0 ? categories[0] : {id: "" ,name: ""},
          gender: genders.length > 0 ? genders[0] : {id: "" ,name: ""},
          size: sizes.length > 0 ? sizes[0] : {id: "" ,name: ""},
        }}
        categories={categories} // Pass the categories fetched from the API
        genders={genders} // Pass the genders fetched from the API
        sizes={sizes} // Pass the sizes fetched from the API
        onSubmit={async (value: any) => {
          await create(value);
        }}
      />
    </div>
  );
}