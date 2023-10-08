import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Typography, Paper, Box, Button, CardMedia, Rating } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { urlProducts } from "../../Config/endpoinst";
import { ProductDetailsDTO } from "./product.model";

export default function ProductDetails() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [productDetails, setProductDetails] = useState<ProductDetailsDTO>();
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    try {
      const fetchData = async () => {
        await axios
          .get(`${urlProducts}?Id=${id}`)
          .then((response: AxiosResponse<ProductDetailsDTO[]>) => {
            setProductDetails(response.data[0]);
            setUserRating(response.data[0].ratingNumber)
            console.log(response.data)

          });
      };
      fetchData();
    } catch (error) {}
  }, []);
 
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 120px)",
      }}
    >
      <Paper
        elevation={3}
        style={{ padding: "20px", maxWidth: "80%", width: "500px" }}
      >
        <Typography variant="h5" gutterBottom>
          Product Details
        </Typography>
        <CardMedia
          component="img"
          height="auto" // Allow the height to adjust based on the image aspect ratio
          image={`${process.env.PUBLIC_URL}/ProductImages/${productDetails?.imageUrl}`}
          alt={productDetails?.name}
          style={{ marginBottom: "10px" }}
        />
        <Typography variant="h6" gutterBottom>
          Product Name: {productDetails?.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Description: {productDetails?.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Price: ${productDetails?.price.toFixed(2)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Category: {productDetails?.categoryName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Size: {productDetails?.sizeName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Gender: {productDetails?.genderName}
        </Typography>
        <Rating
            value={userRating} // Use the user's rating from state
            precision={0.5}
            readOnly={true}
          />
        <Box mt={3} style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" color="primary">
            Add to Cart
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

