import { useState } from "react";
import { changePassCredencials, changePasswordResponse } from "../auth.models";
import axios from "axios";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { urlChangePassword } from "../../Config/endpoinst";
import { useNavigate } from "react-router-dom";
import ResetPasswordFrom from "./ResetPasswordFrom";
import { getClaims } from "../handleJWT";

export default function ResetPassowrd() {
  const navigate = useNavigate();
  const [error, setError] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  async function loginUser(userCred: changePassCredencials) {
    try {
        const claims = getClaims();
        const userIdClaim = claims.find((claim) => claim.name === "nameid");
        const userId = userIdClaim?.value || "";
      var response = await axios.post<changePasswordResponse>(
        `${urlChangePassword}?id=${userId}`,
        userCred
      );
      setError([]);
      if (response.data.Message === 'false') {
        setError(["An error accured!"]);
      } else {
        navigate("../login");
      }
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
          {successMessage === null ? "An error occurred!" : successMessage}
        </Alert>
      </Snackbar>
      <ResetPasswordFrom
        model={{
          id: "",
          currentPassword: "",
          newPassword: "",
          repeatPassword: "",
        }}
        onSubmit={async (value) => {
          await loginUser(value);
        }}
      ></ResetPasswordFrom>
    </div>
  );
}
