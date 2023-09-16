// import React from "react";
// import { Typography, Container, Link } from "@mui/material";

// const footerStyle: React.CSSProperties = {
//   backgroundColor: "#333",
//   color: "#fff",
//   padding: "20px 0",
//   position: "fixed",
//   bottom: 0,
//   width: "100%",
//   left: 0, // Add left: 0 to ensure no left margin
//   margin: 0, // Remove any margin
//   zIndex: 9999, // Adjust the z-index as needed, especially if other elements overlap
// };

// const Footer: React.FC = () => {
//   return (
//     <footer style={footerStyle}>
//       <Container>
//         <Typography variant="h6">Clothes Store Website</Typography>
//         <Typography variant="body2">
//           © {new Date().getFullYear()} All Rights Reserved
//         </Typography>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;


import { Box, Container, Link, Typography, styled } from '@mui/material';

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle1">
            &copy; 2022 - Tokyo Free White React Typescript Admin Dashboard
          </Typography>
        </Box>
        <Typography
          sx={{
            pt: { xs: 2, md: 0 }
          }}
          variant="subtitle1"
        >
          Crafted by{' '}
          <Link
            href="https://bloomui.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            BloomUI.com
          </Link>
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
