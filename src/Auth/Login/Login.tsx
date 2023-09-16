import { useContext, useState } from "react";
import {
  authenticationResponse,
  authenticationTokenResponse,
  loginCredencials,
} from "../auth.models";
import axios from "axios";
import { Alert, AlertTitle } from "@mui/material";
import SingInSide from "./SingInSide";
import { urlLogin } from "../../Config/endpoinst";
import { useNavigate } from "react-router-dom";
import { getClaims, saveToken } from "../handleJWT";
import AuthenticationContext from "../AuthenticationContext";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { update } = useContext(AuthenticationContext);

  async function loginUser(userCred: loginCredencials) {
    try {
      var response = await axios.post<authenticationResponse>(
        urlLogin,
        userCred
      );
      saveToken(response.data.token);
      update(getClaims());
      setError(null);
      if (response.data.token === null) {
        setError("Incorrect Login!");
      } else {
        navigate("/", { state: { successMessage } });
      }
    } catch (error: any) {
      if (error.response) {
        const errorResponse = error.response.data;
        const errorMessage = `${errorResponse.detail}`;
        setError(errorMessage);
      }
    }
  }

  return (
    <div>
      {error && ( // Conditional rendering of error message
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <SingInSide
        model={{ username: "", password: "" }}
        onSubmit={async (value) => {
          await loginUser(value);
        }}
      ></SingInSide>
    </div>
  );
}
