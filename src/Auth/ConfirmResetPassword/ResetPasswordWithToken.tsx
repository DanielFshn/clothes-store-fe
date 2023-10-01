import { useState } from "react";
import { ConfirmForgotPassword, EmailSendResponse, changePasswordResponse, forgotPasswordRequest } from "../auth.models";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import { urlResetPassword } from "../../Config/endpoinst";
import ResetPasswordWithTokenForm from "./ResetPasswordWithTokenForm";

export default function ResetPasswordWithToken() {
  const [error, setError] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar

  async function sendResetEmail(resetCred: ConfirmForgotPassword) {
    try {
      var response = await axios.post<changePasswordResponse>(
        urlResetPassword,
        resetCred
      );
      setError([]);
      if (response.data.Message === undefined) {
        if (response.data !== null) {
          setSuccessMessage("Error accured!");
          setSnackbarOpen(true);
        } 
      }else if(response.data.Message === 'Password is reseted succesfully!'){
        setSuccessMessage(response.data.Message);
        setSnackbarOpen(true);
      }else{
        setError([response.data.Message]);
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
          {successMessage === null ? error.toString() : successMessage}
        </Alert>
      </Snackbar>
      <ResetPasswordWithTokenForm
        model={{ email: "", token : "", newPassword: "", repeatNewPass: "" }}
        onSubmit={async (value) => {
          await sendResetEmail(value);
        }}
      ></ResetPasswordWithTokenForm>
    </div>
  );
}
