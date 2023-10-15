import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentStatus from '../../Uitls/stripe/payment-status';
import { Container, Paper, Typography, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const stripePromise = loadStripe('pk_test_51Nz4jeFm69NAZSEh8Q2DZ3XlDVWxxtD0qSLDlgqxCwY4qSrogRecQN8Sw8MmIPB5SU3xNWi9ib2ejCSMoEJuawMK00L9AmqabV');

const Thankyou = () => {
  return (
    <Elements stripe={stripePromise}>
      <Container maxWidth="lg" className="mt-12">
        <Paper elevation={3} className="mx-auto p-4">
          <Box display="flex" alignItems="center">
            {/* Updated styling for the success icon */}
            <CheckCircleIcon sx={{ fontSize: 500, color: '#4CAF50', marginRight: 2 }} />
            <Typography variant="h6" color="textPrimary">
              <PaymentStatus />
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Elements>
  );
};

export default Thankyou;
