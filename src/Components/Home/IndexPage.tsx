import React from "react";
import Authorize from "../../Auth/Authorize";
import { Box, Container } from "@mui/system";
import { Button, Typography } from "@mui/material";

export default function IndexPage() {
  return (
    <div>
      <Authorize
        authorized={<>You are authorize</>}
        notAuthorized={<>You are not Admin</>}
        role="Admin"
      ></Authorize>
      <br />
      Do te shfaqen produktet me ante te kartave

      <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"  // Set the height to fill the viewport
      bgcolor="primary.main"  // Set your desired background color
      color="white"
    >
      <Typography variant="h2" gutterBottom>
        Welcome to Our E-Commerce Store
      </Typography>
      <Typography variant="body1" paragraph>
        Discover the latest trends in clothing and fashion.
      </Typography>
      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmclMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
        alt="Clothing"
        style={{ maxWidth: '100%', marginBottom: '1rem' }}
      />
      <Button variant="contained" color="secondary">
        Shop Now
      </Button>
    </Box>
    </div>
  );
}
