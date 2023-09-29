import { Button, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ProductCard from "./Helpers/ProductCard";
import ItemList from "./Helpers/ItemList";
import { useEffect, useState } from "react";
import {
  CategoryOption,
  GenderOption,
  Product,
  SizeOption,
} from "./product.model";
import axios, { AxiosResponse } from "axios";
import {
  urlGetCategories,
  urlGetGenders,
  urlProducts,
  urlSizes,
} from "../../Config/endpoinst";
import LoadingSpinner from "../../Uitls/LoadSpinner";
import { claim } from "../../Auth/auth.models";
import AuthenticationContext from "../../Auth/AuthenticationContext";
import { getClaims } from "../../Auth/handleJWT";
import Authorize from "../../Auth/Authorize";

export default function IndexProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  //  const [claims, setClaims] = useState<claim[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
  const [genreOptions, setGenreOptions] = useState<GenderOption[]>([]);
  const [sizeOptions, setSizeOptions] = useState<SizeOption[]>([]);
  const [dataTimestamp, setDataTimestamp] = useState(Date.now());
  const updateDataTimestamp = () => {
    setDataTimestamp(Date.now());
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const claims = getClaims();
        const userIdClaim = claims.find((claim) => claim.name === "nameid");
        const userId = userIdClaim?.value || "";

        const userQuery = `?UserId=${userId}`;
        let filterQuery = "";
        if (selectedCategory !== "" && selectedCategory !== undefined) {
          filterQuery = `&Category=${selectedCategory}`;
        }
        if (selectedGenre !== "" && selectedGenre !== undefined) {
          filterQuery = `&Gender=${selectedGenre}`;
        }
        if (selectedSize !== "" && selectedSize !== undefined) {
          filterQuery = `&Size=${selectedSize}`;
        }
        const response = await axios.get(
          `${urlProducts}${userQuery}${filterQuery}`
        );
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
  }, [selectedCategory, selectedGenre, selectedSize,dataTimestamp]);

  const filterProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.categoryName === selectedCategory
      );
    }

    if (selectedGenre) {
      filteredProducts = filteredProducts.filter(
        (product) => product.genderName === selectedGenre
      );
    }

    if (selectedSize) {
      filteredProducts = filteredProducts.filter(
        (product) => product.sizeName === selectedSize
      );
    }

    return filteredProducts;
  };

  const fetchDropdownOptions = async () => {
    try {
      // Fetch options for categories, genres, and sizes from your API
      const categoriesResponse = await axios.get(urlGetCategories);
      const genresResponse = await axios.get(urlGetGenders);
      const sizesResponse = await axios.get(urlSizes);

      // Set the fetched options in state
      setCategoryOptions(
        categoriesResponse.data.data.map(
          (category: { id: string; name: string }) => category
        )
      );
      setGenreOptions(
        genresResponse.data.map(
          (gender: { id: string; name: string }) => gender
        )
      );
      setSizeOptions(
        sizesResponse.data.map((size: { id: string; name: string }) => size)
      );
    } catch (error) {
      console.error("Error fetching dropdown options:", error);
    }
  };
  useEffect(() => {
    // Fetch dropdown options when the component mounts
    fetchDropdownOptions();
  }, []);

  const filteredProducts = filterProducts();
  console.log("Category Options:", categoryOptions);
  console.log("Genre Options:", genreOptions);
  console.log("Size Options:", sizeOptions);
  return (
    <>
      {loading ? ( // Render the LoadingSpinner when loading is true
        <LoadingSpinner />
      ) : (
        <div style={{ padding: "20px" }}>
          <Typography variant="h4" component="h1" gutterBottom></Typography>
          <Typography variant="subtitle1" gutterBottom>
            Explore our wide range of products.
            <br />
            Filter products as desired!
          </Typography>
          <div style={{ display: "flex", gap: "10px" }}>
            <Select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              placeholder="Category"
            >
              <MenuItem value="">All Categories</MenuItem>
              {categoryOptions.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={selectedGenre}
              onChange={(event) => setSelectedGenre(event.target.value)}
              placeholder="Genre"
            >
              <MenuItem value="">All Genres</MenuItem>
              {genreOptions.map((genre) => (
                <MenuItem key={genre.id} value={genre.name}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={selectedSize}
              onChange={(event) => setSelectedSize(event.target.value)}
              placeholder="Size"
            >
              <MenuItem value="">All Sizes</MenuItem>
              {sizeOptions.map((size) => (
                <MenuItem key={size.id} value={size.name}>
                  {size.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <br />
          <Authorize
            role="Admin"
            authorized={
              <Link to="/product/create" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary">
                  Create Product
                </Button>
              </Link>
            }
          />
          <br />
          <br />
          <ItemList items={filteredProducts} updateDataTimestamp={updateDataTimestamp} ></ItemList>
        </div>
      )}
      ;
    </>
  );
}
