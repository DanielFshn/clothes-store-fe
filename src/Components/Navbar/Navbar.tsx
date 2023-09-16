// Navbar.tsx
import React, { useState } from "react";
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

const Navbar: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

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
        <List>
          <ListItem button>
            <Link to="/login">
              <ListItemText primary="Log In" />
            </Link>
          </ListItem>
        </List>
      </Toolbar>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
        {list()}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
