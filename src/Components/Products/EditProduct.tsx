import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  urlEditProduct,
  urlGetCategories,
  urlGetGenders,
  urlGetProductById,
  urlSaveImage,
  urlSizes,
} from "../../Config/endpoinst";
import axios, { AxiosResponse } from "axios";
import { CategoryOption, editProductDTO } from "./product.model";
import { Alert, AlertTitle } from "@mui/material";
import Typography from "../Home/Typography";
import ProductForm from "./ProductForm";
import TestComponent from "../../Uitls/TestComponent";

export default function EditProduct() {
  const { id }: any = useParams();
  const navigate = useNavigate();
  const [error, setErrors] = useState<string | null>(null);
  const [product, setProduct] = useState<editProductDTO>();
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [genders, setGenders] = useState([]);
  const [sizes, setSizes] = useState([]);
  
  useEffect(() => {
    axios
      .get(`${urlGetProductById}?id=${id}`)
      .then((response: AxiosResponse<editProductDTO>) => {
        setProduct(response.data);
      });
  },[id]);

  async function edit(productToEdit: editProductDTO) {
    try {
      if (productToEdit.image) {
        const formData = new FormData();
        formData.append("formFile", productToEdit.image);
        formData.append("fileName", productToEdit.imageUrl);
        await axios.post(urlSaveImage, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      axios.put(`${urlEditProduct}/${id}`, productToEdit);
      navigate("/products");
    } catch (error: any) {
      if (error && error.response) {
        const errorResponse = error.response.data;
        const errorMessage = `${errorResponse.detail}`;
        setErrors(errorMessage);
      }
    }
  }

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(urlGetCategories);
        setCategories(categoriesResponse.data.data);
        const gendersResponse = await axios.get(urlGetGenders);
        setGenders(gendersResponse.data);
        const sizesResponse = await axios.get(urlSizes);
        setSizes(sizesResponse.data);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <br />
      <Typography variant="h6" align="center">
        Edit Product
      </Typography>

      {product ? (
        <ProductForm
          model={product}
          categories={categories}
          genders={genders} 
          sizes={sizes}
          onSubmit={async (value) => {
            await edit(value);
          }}
        ></ProductForm>
      ) : (
        //TestComponent do te zevendesohet psh me nje component te tipit LoadConoponent
        <TestComponent />
      )}
    </div>
  );
}
