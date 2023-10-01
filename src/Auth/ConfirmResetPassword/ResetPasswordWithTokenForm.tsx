import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ConfirmForgotPassword } from "../auth.models";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextFieldComponent from "../../Components/HelperComponents/TextFieldComponent";
import { Link } from "react-router-dom";
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to={"https://mui.com/"}>
        Clothes Store
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ResetPasswordWithTokenForm(props: sendResetEmail) {
    const queryParams = new URLSearchParams(document.location.search);
  
    const initialEmail = queryParams.get('email') || '';
    const initialToken = queryParams.get('token') || '';
  
    React.useEffect(() => {
        var test = initialToken.replace(/\+/g, ' ').trim();
     props.model.email = initialEmail;
     props.model.token = initialToken.replace(/\+/g, ' ').trim(); // Replace '+' with space
        }, [initialEmail, initialToken, props]);
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://img.freepik.com/premium-photo/woman-store-is-looking-new-shirt-girl-seller-hangs-clothes-stylish-hanger_125398-522.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            
              <Formik
                initialValues={props.model}
                onSubmit={props.onSubmit}
                validationSchema={Yup.object({
                  email: Yup.string().email("Invalid email address").required("This field is required!"),
                  token: Yup.string().required("This field is required!"),
                  newPassword: Yup.string().required("This field is required!"),
                  repeatNewPass: Yup.string().required("This field is required!"),
                })}
              >
                {(formikProps) => (
                  <Form>
                    <TextFieldComponent
                      field="newPassword"
                      displayField="New Password"
                      type="password"
                    />
                    <TextFieldComponent
                      field="repeatNewPass"
                      displayField="Repeat Passowrd"
                      type="password"
                    />
                    
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={formikProps.isSubmitting}
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

interface sendResetEmail {
  model: ConfirmForgotPassword;
  onSubmit(
    values: ConfirmForgotPassword,
    actions: FormikHelpers<ConfirmForgotPassword>
  ): void;
}