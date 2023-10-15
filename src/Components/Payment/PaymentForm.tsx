import React, { useState, FormEvent, ChangeEvent } from 'react';
import { PaymentElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { TextField, Button, Typography, Container, CircularProgress } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
const nodeEnv: string = (process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string);
const stripePromise = loadStripe(`${nodeEnv}`);
const defaultFormFields = {
  displayName: '',
  email: ''
}

export default function PaymentForm (){
  const elements = useElements();
  const stripe = useStripe();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email } = formFields;

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/thankyou/',
        payment_method_data: {
          billing_details: {
            name: displayName,
            email: email,
            phone: '7873679090',
            address: {
              line1: 'Example Building #129',
              city: 'Carolina',
              state: 'PR',
              postal_code: '00987',
              country: 'US'
            }
          }
        },
      },
    });

    setIsProcessingPayment(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`.
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <Container maxWidth="sm" className='mt-3'>
        <Elements stripe={stripePromise}>
      <form onSubmit={paymentHandler}>
        <TextField
          label="Name"
          type="text"
          required
          fullWidth
          margin="normal"
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          type="email"
          required
          fullWidth
          margin="normal"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <PaymentElement />
        {errorMessage && (
          <Typography variant="body2" color="error" className='mt-2'>
            {errorMessage}
          </Typography>
        )}
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          disabled={isProcessingPayment}
          startIcon={isProcessingPayment && <CircularProgress size={20} />}
        >
          Pay
        </Button>
      </form>
      </Elements>
    </Container>
  )
};

