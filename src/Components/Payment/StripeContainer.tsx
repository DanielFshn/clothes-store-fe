import { Elements } from '@stripe/react-stripe-js'
import React from 'react'
import PaymentForm2 from './PaymentForm2'
import { loadStripe } from '@stripe/stripe-js';


//const nodeEnv: string = (process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string);
const stripePromise = loadStripe('pk_test_51Nz4jeFm69NAZSEh8Q2DZ3XlDVWxxtD0qSLDlgqxCwY4qSrogRecQN8Sw8MmIPB5SU3xNWi9ib2ejCSMoEJuawMK00L9AmqabV');

export default function StripeContainer() {
    return (
		<Elements stripe={stripePromise}>
			<PaymentForm2 />
		</Elements>
	)
}
