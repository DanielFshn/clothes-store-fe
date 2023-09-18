import { Button } from "@mui/material";

export default function IndexProducts() {
  return (
    <div>
      <h3>Products Page</h3>
      <Button
        variant="contained"
        onClick={() => {
          // ...saving to db
          console.log("btn is clicked");
        }}
      >
        Create Product
      </Button>
    </div>
  );
}
