import { Button, MenuItem, Select, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ProductCard from "./Helpers/ProductCard";
import ItemList from "./Helpers/ItemList";
import { useEffect, useState } from "react";
import { Product } from "./product.model";
import axios, { AxiosResponse } from "axios";
import { urlProducts } from "../../Config/endpoinst";
import LoadingSpinner from "../../Uitls/LoadSpinner";
import { claim } from "../../Auth/auth.models";
import AuthenticationContext from "../../Auth/AuthenticationContext";
import { getClaims } from "../../Auth/handleJWT";

export default function IndexProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
//  const [claims, setClaims] = useState<claim[]>([]);


useEffect(() => {
    const fetchData = async () => {
      try {
        const claims = getClaims();
        const userIdClaim = claims.find((claim) => claim.name === "nameid");
        const userId = userIdClaim?.value || "";

        const userQuery = `?UserId=${userId}`;
        const response = await axios.get(`${urlProducts}${userQuery}`);
        setProducts(response.data);

        const startTime = new Date().getTime();
        const endTime = new Date().getTime();
        const elapsedTime = endTime - startTime;
        const minimumLoadingTime = 1000; // 1 second

        setTimeout(() => {
          setLoading(false);
        }, Math.max(minimumLoadingTime - elapsedTime, 0));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      {loading ? ( // Render the LoadingSpinner when loading is true
        <LoadingSpinner />
      ) : (
        <div style={{ padding: "20px" }}>
            <Typography variant="h4" component="h1" gutterBottom></Typography>
            <Typography variant="subtitle1" gutterBottom>
              Explore our wide range of products.
            </Typography>
            <Link to="/product/create" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                Create Product
              </Button>
            </Link>
            <br />
            <br />
            <ItemList items={products}></ItemList>
        </div>
      )}
      ;
    </>
  );
}
