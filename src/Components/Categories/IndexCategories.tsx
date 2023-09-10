import { Alert, AlertTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function IndexCategories() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const successMessage = params.get("successMessage");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  useEffect(() => {
    if (successMessage) {
      setShowSuccessMessage(true);
    }
  }, [successMessage]);

  return (
    <div>
      <h3>Categories</h3>
      {showSuccessMessage &&  (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {successMessage}
        </Alert>
      )}
      <Link to="/category/create">Create Category</Link>
    </div>
  );
}
