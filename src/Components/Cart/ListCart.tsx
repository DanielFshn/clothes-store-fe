import React from "react";
import { useAppSelector } from "../../store/store";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  IconButton,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../store/store";
import { removeProductFromCart, updateProductQuantity } from "../../store/features/productSlice";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";

export default function ListCart() {
  const productInCart = useAppSelector((state) => state.product.productsCart);
  const dispatch = useAppDispatch();

  const handleDelete = async (productId: string) => {
    try {
      dispatch(removeProductFromCart(productId))
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    dispatch(
      updateProductQuantity({
        productId,
        newQuantity,
      })
    );
  };

  const isCartEmpty = productInCart.length === 0;

  return (
    <Paper
      elevation={3}
      style={{
        padding: "16px",
        marginTop: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Products in Cart
      </Typography>
      <List style={{ width: "100%", maxWidth: "800px" }}>
        {productInCart.map((product, index) => (
          <React.Fragment key={product.id}>
            <ListItem
              disablePadding
              alignItems="center"
              style={{ width: "100%", padding: "16px" }}
            >
              <ListItemAvatar style={{ marginRight: "16px" }}>
                <Avatar
                  alt={product.name}
                  src={`${process.env.PUBLIC_URL}/ProductImages/${product.imageUrl}`}
                  sx={{ width: 120, height: 120 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                secondary={`Price: ${product.price}$ | Category: ${product.categoryName} | Gender: ${product.genderName} | Size: ${product.sizeName} | Quantity: ${product.quantity} | Total: ${product.total}$`}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(product.id)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="decrease-quantity"
                onClick={() => handleQuantityChange(product.id, Math.max(1, product.quantity - 1))}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="increase-quantity"
                onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
              >
                <AddIcon />
              </IconButton>
            </ListItem>
            {index < productInCart.length - 1 && <Divider />}
          </React.Fragment>
        ))}
        {!isCartEmpty && (
          <ListItem disablePadding alignItems="center" style={{ width: '100%', padding: '16px' }}>
            <Link to="/payment" style={{ width: '100%' }}>
              <Button variant="contained" color="primary">
                Checkout
              </Button>
            </Link>
          </ListItem>
        )}
        {isCartEmpty && (
          <Typography variant="body2" color="textSecondary">
            Your cart is empty.
          </Typography>
        )}
      </List>
    </Paper>
  );
}
