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
  ListItemIcon,
  Link,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const list = () => (
    <div role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
      <List>
        <ListItem button>
          <Link href="/">Home</Link>
        </ListItem>
        <ListItem button>
          <Link href="/products">
            <ListItemText primary="Products" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link href="/categories">
            <ListItemText primary="Categories" />
          </Link>
        </ListItem>
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
          Clothes Store
        </Typography>
        <Button href="/login" color="inherit">
          Log In
        </Button>
      </Toolbar>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
        {list()}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
