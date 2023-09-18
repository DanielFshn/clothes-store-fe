import { useContext, useState } from "react";
import {
  authenticationResponse,
  authenticationTokenResponse,
  loginCredencials,
} from "../auth.models";
import axios from "axios";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import SingInSide from "./SingInSide";
import { urlLogin } from "../../Config/endpoinst";
import { useNavigate } from "react-router-dom";
import { getClaims, saveToken } from "../handleJWT";
import AuthenticationContext from "../AuthenticationContext";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { update } = useContext(AuthenticationContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar

  async function loginUser(userCred: loginCredencials) {
    try {
      var response = await axios.post<authenticationResponse>(
        urlLogin,
        userCred
      );
      saveToken(response.data.token);
      update(getClaims());
      setError([]);
      if (response.data.token === null) {
        setError(["Incorrect Login!"]);
      } else {
        navigate("/", { state: { successMessage } });
      }
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
      <SingInSide
        model={{ username: "", password: "" }}
        onSubmit={async (value) => {
          await loginUser(value);
        }}
      ></SingInSide>
    </div>
  );
}
