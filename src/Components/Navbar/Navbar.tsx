// Navbar.tsx
import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Authorize from "../../Auth/Authorize";
import { logout } from "../../Auth/handleJWT";
import AuthenticationContext from "../../Auth/AuthenticationContext";

const Navbar: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const { update, claims } = useContext(AuthenticationContext);
  function getUsername(): string {
    return claims.filter((x) => x.name === "unique_name")[0]?.value;
  }

  const list = () => (
    <div role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
      <List>
        <ListItem button>
          <Link to="/">Home</Link>
        </ListItem>
        <ListItem button>
          <Link to="/products">
            <ListItemText primary="Products" />
          </Link>
        </ListItem>
        <Authorize
          role="admin"
          authorized={
            <>
              <ListItem button>
                <Link to="/categories">
                  <ListItemText primary="Categories" />
                </Link>
              </ListItem>
            </>
          }
        />
      </List>
    </div>
  );
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to={"/"}>
            <ListItemText>Clothes Store</ListItemText>
          </Link>
        </Typography>
        <Authorize
          notAuthorized={
            <List>
              <ListItem button>
                <Link to="/login">
                  <ListItemText primary="Log In" />
                </Link>
              </ListItem>
              <ListItem button>
                <Link to="/register">
                  <ListItemText primary="Sing Up" />
                </Link>
              </ListItem>
            </List>
          }
          authorized={
            <>
              <span>Hellow {getUsername()}</span>
              <Button
                variant="contained"
                onClick={() => {
                  logout();
                  update([]);
                }}
              >
                Log Out
              </Button>
            </>
          }
        ></Authorize>
      </Toolbar>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
        {list()}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
