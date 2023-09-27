import React, { useEffect, useState } from "react";
import { CategoryOption, GenderOption, SizeOption, productCreationDTO } from "./product.model";
import { Form, Formik, FormikHelpers } from "formik";
import { Box, Button, Grid, MenuItem, Paper, Select, Typography } from "@mui/material";
import TextFieldComponent from "../HelperComponents/TextFieldComponent";
import * as Yup from "yup";
import { Link } from "react-router-dom";
export default function ProductForm(props: productFormProps) {
  const [selectedSize, setSelectedSize] = useState<SizeOption | undefined>(props.model.size);
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption | undefined>(props.model.category);
  const [selectedGender, setSelectedGender] = useState<GenderOption | undefined>(props.model.gender);
  useEffect(() => {
    setSelectedSize(props.model.size);
    setSelectedCategory(props.model.category);
    setSelectedGender(props.model.gender);
  }, [props.model]);
  return (
    <div>
      <Grid container>
        <Grid item sm={3} xs={false}></Grid>
        <Grid item sm={6} xs={12}>
          <Paper>
            <Box m={5} p={3}>
              <Formik
                initialValues={props.model}
                onSubmit={props.onSubmit}
                validationSchema={Yup.object({
                  name: Yup.string()
                    .required("This field is required")
                    .max(50, "Max length is 50 characters!"),
                  description: Yup.string()
                    .required("This field is required")
                    .max(200, "Max length is 200 characters!"),
                  price: Yup.number()
                    .required("This field is required")
                    .min(0, "Price cannot be negative"),
                    quantity: Yup.number().required("Quantity is required!"),

                  imageUrl: Yup.mixed().required("Image is required"),
                  category: Yup.object()
                  .shape({
                    id: Yup.string().notOneOf([""], "Please select a Category"),
                    name: Yup.string().notOneOf([""], "Please select a Category"),
                  })
                  .required("Category is required"),
                  gender:Yup.object()
                  .shape({
                    id: Yup.string().notOneOf([""], "Please select a Gender"),
                    name: Yup.string().notOneOf([""], "Please select a Gender"),
                  })
                  .required("Gender is required"),
                  size: Yup.object()
                  .shape({
                    id: Yup.string().notOneOf([""], "Please select a Size"),
                    name: Yup.string().notOneOf([""], "Please select a Size"),
                  })
                  .required("Size is required"),
                })}
              >
                {(formikProps) => (
                  <Form>
                    <TextFieldComponent
                      field="name"
                      displayField="Product Name"
                    />
                    <TextFieldComponent
                      field="description"
                      displayField="Description"
                    />

                    <TextFieldComponent field="price" displayField="Price" />
                    <TextFieldComponent
                      field="quantity"
                      displayField="Quantity"
                    />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "30%", marginRight: "16px" }}>
                            {/* Size Dropdown */}
                            <Typography variant="subtitle1" gutterBottom>
                    Size
                  </Typography>
              <Select
                label="Size"
                name="size"
                value={selectedSize ? selectedSize.id : ""}
                onChange={(e) => {
                  const selectedOption = props.sizes.find((option) => option.id === e.target.value);
                  setSelectedSize(selectedOption);
                  formikProps.setFieldValue("size", selectedOption);
                }}
              >
                {props.sizes.map((size) => (
                  <MenuItem key={size.id} value={size.id}>
                    {size.name}
                  </MenuItem>
                ))}
              </Select>
              </div>
              <div style={{ width: "30%", marginRight: "16px" }}>
              {/* Gender Dropdown */}
              <Typography variant="subtitle1" gutterBottom>
                    Gender
                  </Typography>
              <Select
                label="Gender"
                name="gender"
                value={selectedGender ? selectedGender.id : ""}
                onChange={(e) => {
                  const selectedOption = props.genders.find((option) => option.id === e.target.value);
                  setSelectedGender(selectedOption);
                  formikProps.setFieldValue("gender", selectedOption);
                }}
              >
                {props.genders.map((gender) => (
                  <MenuItem key={gender.id} value={gender.id}>
                    {gender.name}
                  </MenuItem>
                ))}
              </Select>
              </div>
              <div style={{ width: "30%" }}>
              {/* Category Dropdown */}
              <Typography variant="subtitle1" gutterBottom>
                    Category
                  </Typography>
              <Select
                label="Category"
                name="category"
                value={selectedCategory ? selectedCategory.id :  ""}
                onChange={(e) => {
                  const selectedOption = props.categories.find((option) => option.id === e.target.value);
                  setSelectedCategory(selectedOption);
                  formikProps.setFieldValue("category", selectedOption);
                }}
              >
                {props.categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              </div>
              </div>

                    <input
                      type="file"
                      name="imageFile"
                      accept="image/*" // Allow only image files
                      onChange={(event) => {
                        const files = event.currentTarget?.files;
                        if (files && files.length > 0) {
                          formikProps.setFieldValue("imageFile", files[0]);
                        }
                      }}
                    />

                    <br />
                    <br />

                    
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Button
                          disabled={formikProps.isSubmitting}
                          type="submit"
                          variant="contained"
                        >
                          Save Changes
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Link to={"/products"}>
                          <Button variant="contained">Cancel</Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Box>
          </Paper>
        </Grid>
        <Grid item sm={3} xs={false}></Grid>
      </Grid>
    </div>
  );
}

interface productFormProps {
  model: productCreationDTO;
  onSubmit(
    values: productCreationDTO,
    action: FormikHelpers<productCreationDTO>
  ): void;
  sizes: SizeOption[]; 
  categories: CategoryOption[]; 
  genders: GenderOption[]; 
}
