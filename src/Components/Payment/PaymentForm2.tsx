import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { urlCreateOrder, urlPayment } from "../../Config/endpoinst";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ProductCart } from "../../store/features/productSlice";
import { useNavigate } from "react-router-dom";
import { addOrder, saveOrderAsync } from "../../store/features/orderSlice";
import {clearCart } from "../../store/features/productSlice";
import AuthenticationContext from "../../Auth/AuthenticationContext";

interface PaymentForm2Props {
  // Add any additional props here
}

const PaymentForm2: React.FC<PaymentForm2Props> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productsCart = useSelector(
    (state: { product: { productsCart: ProductCart[] } }) =>
      state.product.productsCart
  );

  // Calculate the total amount
  const totalAmount = productsCart.reduce(
    (total, product) => total + product.total,
    0
  );
  const { claims } = useContext(AuthenticationContext);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(`stripe =>  ${stripe}`);
    if (!stripe && !elements) {
      return;
    }

    if (!e || !e.currentTarget) {
      console.error("Event or currentTarget is null:", e);
      return;
    }
    try {
      if (stripe != null) {
        const userIdClaim = claims.find((claim) => claim.name === "nameid");
        if (userIdClaim) {
          const userId = userIdClaim.value;
          // Now you have the userId, you can use it as needed
          const addressValue = e.currentTarget.address?.value;
          const cityValue = e.currentTarget.city?.value;
          const stateValue = e.currentTarget.state?.value;
          const postalCodeValue = e.currentTarget.postalCode?.value;
          const emailValue = e.currentTarget.email?.value;
          const phoneValue = e.currentTarget.phone?.value;
          const fullNameValue = e.currentTarget.fullName?.value;
          dispatch(
            addOrder({
              id: "",
              userId: userId,
              totalAmount: totalAmount * 100,
              products: productsCart,
            })
          );
          console.log(
            "Dispatched action:",
            addOrder({
              id: "",
              userId: userId,
              totalAmount: totalAmount * 100,
              products: productsCart,
            })
          );
          const orderApiResponse = await axios.post(urlCreateOrder, {
            userId: userId,
            totalAmount: totalAmount * 100,
            country: stateValue,
            city: cityValue,
            streetName: addressValue,
            postalCode: postalCodeValue,
            products: productsCart,
          });
          
           console.log("API response:", orderApiResponse);
          const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements?.getElement(CardElement)!,
            billing_details: {
              address: {
                line1: addressValue,
                city: cityValue,
                state: stateValue,
                postal_code: postalCodeValue,
              },
              email: emailValue,
              phone: phoneValue,
              name: fullNameValue,
            },
          });
          if (paymentMethod) {
            const { id } = paymentMethod as { id: string };
            const response = await axios.post(`${urlPayment}`, {
              amount: totalAmount * 100,
              id,
            });

            if (response.data) {
              console.log("Successful payment");
              setSuccess(true);
              // Dispatch the clearCart action
              dispatch(clearCart())
              var client_secret = response.data.client_secret;
              console.log(client_secret);
              navigate(
                `/thankyou?payment_intent_client_secret=${client_secret}`
              );
            }
          }
        }
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!success ? (
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Box mb={3}>
              <Typography component="h1" variant="h5">
                Payment Form
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="fullName"
                  variant="outlined"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="address"
                  variant="outlined"
                  required
                  fullWidth
                  id="address"
                  label="Billing Address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="city"
                  variant="outlined"
                  required
                  fullWidth
                  id="city"
                  label="City"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="state"
                  variant="outlined"
                  required
                  fullWidth
                  id="state"
                  label="State"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="postalCode"
                  variant="outlined"
                  required
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  variant="outlined"
                  fullWidth
                  id="phone"
                  label="Phone Number"
                />
              </Grid>
            </Grid>
            <br />
            <fieldset className="FormGroup">
              <div className="FormRow">
                <CardElement />
              </div>
            </fieldset>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#4caf50", color: "white" }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Pay"}
            </Button>
          </form>
        ) : (
          <div>
            <Typography component="h2" variant="h6">
              succes
            </Typography>
          </div>
        )}
      </Box>
    </Container>
  );
};

export default PaymentForm2;
