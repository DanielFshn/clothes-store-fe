import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51Nz4jeFm69NAZSEh8Q2DZ3XlDVWxxtD0qSLDlgqxCwY4qSrogRecQN8Sw8MmIPB5SU3xNWi9ib2ejCSMoEJuawMK00L9AmqabV');

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
        <Elements stripe={stripePromise}>
    <Provider store={store}>
        <App />
    </Provider>
    </Elements>
  </React.StrictMode>
);
