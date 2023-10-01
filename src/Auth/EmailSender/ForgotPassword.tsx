import { useState } from "react";
import { EmailSendResponse, forgotPasswordRequest } from "../auth.models";
import axios from "axios";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { urlLogin, urlSendResetEmail } from "../../Config/endpoinst";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPassowrd() {
  const [error, setError] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar

  async function sendResetEmail(emailCred: forgotPasswordRequest) {
    try {
      var response = await axios.post<EmailSendResponse>(
        urlSendResetEmail,
        emailCred
      );
      setError([]);
      if (response.data.To !== undefined) {
        if (response.data.To !== null || response.data.To !== "") {
          setSuccessMessage("Email is send check the inbox!");
          setSnackbarOpen(true);
        } else {
          setError(["Email is not send please try again later!"]);
          setSnackbarOpen(true);
        }
      }else if(response.data.Message !== undefined){
        setError([response.data.Message]);
        setSnackbarOpen(true);
      }else{
        setError(["Email is not send please try again later!"]);
          setSnackbarOpen(true);
      }
      //if (response.data.Message === null) {
      // setError(["Email is not send please try again later!"]);
      //} else {
      // navigate("/");
      // }
    } catch (error: any) {
      if (error.response) {
        const errorResponse = error.response.data;
        const errorMessage = `${errorResponse.detail}`;
        const initialErrorsArray = errorMessage.split(", ");
        setError(initialErrorsArray);
      }
      setSnackbarOpen(true); // Open the Snackbar
      setSuccessMessage(null);
    }
  }

  return (
    <div>
     
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
      <ForgotPasswordForm
        model={{ email: "" }}
        onSubmit={async (value) => {
          await sendResetEmail(value);
        }}
      ></ForgotPasswordForm>
    </div>
  );
}
