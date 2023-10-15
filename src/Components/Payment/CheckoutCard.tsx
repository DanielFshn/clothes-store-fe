import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from "../Payment/PaymentForm"
import { Paper, Typography, Grid } from '@mui/material';
const nodeEnv: string = (process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string);
const stripePromise = loadStripe(`${nodeEnv}`);

export type StripeTypes = {
  clientSecret: string;
  appearance: {
    theme: "stripe",
    variables: {
      colorPrimary: string
    }
  }
};
//hardcoded cart total
const CheckoutCard = ({ secret }: any) => {
  const  cartTotal  = 200;
  const navigate = useNavigate();

  useEffect(() => {
    if (!stripePromise || !secret) {
      //navigate('/');
    }
  }, [secret, navigate]);

  const options: StripeTypes = {
    clientSecret: secret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#008b8b'
      }
    },
  };

  return (
    <Paper elevation={3} className="mx-3 rounded-lg border shadow-sm">
      <div className="m-5">
        <Typography variant="h5" gutterBottom className="mb-2 pb-3 border-b border-gray-300 text-center font-bold">
          Checkout
        </Typography>
        <Grid container spacing={2} justifyContent="space-between" className="text-center">
          <Grid item xs={6}>
            <Typography>Subtotal:</Typography>
            <Typography>Shipping:</Typography>
            <Typography>Total:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>${cartTotal}</Typography>
            <Typography>$0</Typography>
            <Typography>${cartTotal}</Typography>
          </Grid>
        </Grid>
        {secret && (
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm />
          </Elements>
        )}
      </div>
    </Paper>
  );
};

export default CheckoutCard;
