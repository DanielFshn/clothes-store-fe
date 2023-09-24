import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product, ProductRatingCreation } from "../product.model";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Rating, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { getClaims } from "../../../Auth/handleJWT";
import { claim } from "../../../Auth/auth.models";
import axios from "axios";
import {
  urlCreateProductRating,
  urlUpdateProductRating,
} from "../../../Config/endpoinst";

export default function ProductCard(props: ProductCardProps) {
  const [claims, setClaims] = useState<claim[]>([]);
  const [error, setError] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  const navigate = useNavigate();

  const handleDelete = (productId: string) => {};

  const handleEdit = (productId: string) => {};

  const [userRating, setUserRating] = useState(0);
  const handleRatingChange = async (event: any, newValue: any) => {
    setError([]);
    setUserRating(newValue);
    console.log("new value" + newValue);
    console.log("change the rating item");
    console.log("prodict id " + props.product.id);
    // Call an API or perform an action to save the user's rating on the server
    // You can implement this part as needed.
    // Create a new rating object to send to the server
    var userId = claims.find((claim) => claim.name === "nameid")?.value;
    if (userId !== undefined) {
      const newRating = {
        productId: props.product.id,
        userId: userId,
        ratingNumber: newValue,
        title: "test",
        comments: "test",
      };

      try {
        var updateResult = await axios.put(
          `${urlUpdateProductRating}?id=${props.product.id}`,
          newRating
        );
        if (
          updateResult.data.Message === "Product Raitng is updated succesfully"
        ) {
          setSuccessMessage(updateResult.data.Message);
          setError([]);
          setSnackbarOpen(true);
          //navigate('/');
        } else {
          var result = await axios.post(urlCreateProductRating, newRating);
          if (result.data && result.data.Message) {
            // Set the success message from the response
            setSuccessMessage(result.data.Message);
            setSnackbarOpen(true);
            setError([]);
          } else {
            // Set a default success message if the response doesn't contain one
            setSuccessMessage("Product rating is added succesfully!");
            setError([]);
          }
        }
      } catch (error: any) {
        if (error.response) {
          const errorResponse = error.response.data;
          const errorMessage = `${errorResponse.detail}`;
          const initialErrorsArray = errorMessage.split(", ");
          setError(initialErrorsArray);
        }
      }
    } else {
      setError(["Log In First!"]);
    }
  };
  // async function CreateRating(prd: ProductRatingCreation) {
  //   var response = await axios.post(urlCreateProductRating, prd);
  // }

  useEffect(() => {
    setError([]);
    setClaims(getClaims());
  }, []);

  return (
    <div style={{ margin: "10px", flex: "0 0 calc(25% - 20px)" }}>
      {error.length > 0 && ( // Conditional rendering of error message
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="220"
          image={props.product.imageUrl}
          alt="image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.product.description}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Price: {props.product.price}$
          </Typography>
          <Rating
            name={`product-rating-${props.product.id}`} // Unique name for each product's rating
            value={props.product.ratingNumber} // Use the user's rating from state
            precision={1}
            onChange={handleRatingChange} // Handle rating changes
          />
        </CardContent>
        <CardActions>
          <Button size="small">Add To Card</Button>
          <Link to={`/product/details?id=${props.product.id}`}>
            <Button size="small">Details</Button>
          </Link>
        </CardActions>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleDelete(props.product.id)}
          >
            Delete
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{ color: "blue" }} // Set blue color for the edit button
            onClick={() => handleEdit(props.product.id)}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={error.length > 0 ? "error" : "success"}
        >
          {successMessage === null ? "An error occurred!" : successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
interface ProductCardProps {
  product: Product;
}
