import {useState, useEffect, useContext} from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useStripe } from '@stripe/react-stripe-js';

  const PaymentStatus = () => {
    const navigate = useNavigate();
    const stripe = useStripe();
    // const { clearCart } = useContext(CartContext);
    const [message, setMessage] = useState<any | null>(null);

    useEffect(() => {
      if (!stripe) {
        return;
      }

      // Retrieve the "payment_intent_client_secret" query parameter appended to
      // your return_url by Stripe.js
      const clientSecret: any = new URLSearchParams(window.location.search).get(
        'payment_intent_client_secret'
      );
       if (!clientSecret) {
      setMessage('Client secret is missing.');
      return;
    }


      stripe
        .retrievePaymentIntent(clientSecret)
        .then(({paymentIntent}: any) => {
          switch (paymentIntent.status) {
            case 'succeeded':
            //   clearCart();
              setMessage(`Thank you! your purchase for $${paymentIntent.amount / 100} has been accepted successfully.`);
              break;

            case 'processing':
              setMessage("Payment processing. We'll update you when payment is received.");
              break;

            case 'requires_payment_method':
              // Redirect your user back to your payment page to attempt collecting
              // payment again
              navigate(-1);
              setMessage('Payment failed. Please try another payment method.');
              break;

            default:
              navigate(-1);
              setMessage('Something went wrong.');
              break;
          }
        })
        .catch((error) => {
          console.error('Error retrieving Payment Intent:', error);
          setMessage('Error retrieving payment status.');
        });
    }, [stripe,navigate]); //[stripe, clearCart, navigate]

    return message;
  };

  export default PaymentStatus;