import React from "react";
import { Typography, Container, Link } from "@mui/material";

const footerStyle: React.CSSProperties = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "20px 0",
  position: "fixed",
  bottom: 0,
  width: "100%",
  left: 0, // Add left: 0 to ensure no left margin
  margin: 0, // Remove any margin
  zIndex: 9999, // Adjust the z-index as needed, especially if other elements overlap
};

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <Container>
        <Typography variant="h6">Clothes Store Website</Typography>
        <Typography variant="body2">
          © {new Date().getFullYear()} All Rights Reserved
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
