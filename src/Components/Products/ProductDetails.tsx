import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Typography,
  Paper,
  Box,
  Button,
  CardMedia,
  Rating,
  Snackbar,
  Alert,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { urlProducts } from "../../Config/endpoinst";
import { ProductDetailsDTO } from "./product.model";
import { getClaims } from "../../Auth/handleJWT";
import { useAppDispatch } from "../../store/store";
import { addProductToCart } from "../../store/features/productSlice";
import Authorize from "../../Auth/Authorize";

export default function ProductDetails() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [productDetails, setProductDetails] = useState<ProductDetailsDTO>();
  const [userRating, setUserRating] = useState(0);
  const [error, setError] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  useEffect(() => {
    try {
      const fetchData = async () => {
        const claims = getClaims();
        const userIdClaim = claims.find((claim) => claim.name === "nameid");
        const userId = userIdClaim?.value || "";
        await axios
          .get(`${urlProducts}?Id=${id}&UserId=${userId}`)
          .then((response: AxiosResponse<ProductDetailsDTO[]>) => {
            setProductDetails(response.data[0]);
            setUserRating(response.data[0].ratingNumber);
            console.log(response.data);
          });
      };
      fetchData();
    } catch (error) {}
  }, []);

  const dispatch = useAppDispatch();

  const handleAddToCart = async () => {
    try {
      if (productDetails) {
        dispatch(
          addProductToCart({
            id: productDetails.id,
            name: productDetails.name,
            description: productDetails.description,
            price: productDetails.price,
            imageUrl: productDetails.imageUrl,
            categoryName: productDetails.categoryName,
            genderName: productDetails.genderName,
            sizeName: productDetails.sizeName,
          })
        );
        console.log("is click add to card");
        setSuccessMessage("Product is added to cart!");
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      setError(error);
    }
  };

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
        <Authorize role="User" authorized={
        <Box mt={3} style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Box>
        }/>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={error.length > 0 ? "error" : "success"}
        >
          {successMessage === null ? error.join(',') : successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
