import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios, { AxiosResponse } from "axios";
import { error } from "console";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51Nz4jeFm69NAZSEh8Q2DZ3XlDVWxxtD0qSLDlgqxCwY4qSrogRecQN8Sw8MmIPB5SU3xNWi9ib2ejCSMoEJuawMK00L9AmqabV"
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
axios.interceptors.request.use(
  (request) => {
    var token = localStorage.getItem("token");
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log(request);
    return request;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use((response) =>
  {
    console.log(response);
    return response;
  },error =>{
    if(error.response && (error.response.status === 401 || error.response.status === 403)){
      console.log("Not Authorized to to this action!")
    }
    return Promise.reject(error);
  })

root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <App />
      </Provider>
    </Elements>
  </React.StrictMode>
);
