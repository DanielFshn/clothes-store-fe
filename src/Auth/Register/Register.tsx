import { useContext, useState } from "react";
import { authenticationResponse, singUpRequest } from "../auth.models";
import axios from "axios";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getClaims, saveToken } from "../handleJWT";
import AuthenticationContext from "../AuthenticationContext";
import { urlRegister } from "../../Config/endpoinst";
import SignUp from "./SignUp";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { update } = useContext(AuthenticationContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  async function registerUser(registerCreds: singUpRequest) {
    try {
      setError([]);
      var response = await axios.post<authenticationResponse>(
        urlRegister,
        registerCreds
      );
      //update(getClaims());
      setSuccessMessage("Registration successful!");
      setSnackbarOpen(true); // Open the Snackbar
      console.log(response.data);
    } catch (error: any) {
      if (error.response) {
        const errorResponse = error.response.data;
        const errorMessage = `${errorResponse.detail}`;
        const initialErrorsArray = errorMessage.split(", ");
        setError(initialErrorsArray);
      }else{
        setError(["An error occurred. Please try again later."]);
      }
      setSnackbarOpen(true); // Open the Snackbar
        setSuccessMessage(null);
    }
  }

  return (
    <div>
      {error.length > 0 ? ( // Conditional rendering of error message
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </Alert>
      ) : null}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={error.length > 0 ? "error" : "success"}
        >
          {successMessage ===  null ? "An error occurred!" : successMessage}
        </Alert>
      </Snackbar>
      <SignUp
        model={{
          userName: "",
          email: "",
          phoneNumber: "",
          password: "",
          repeatPassword: "",
        }}
        onSubmit={async (value) => {
          await registerUser(value);
        }}
      ></SignUp>
    </div>
  );
}
