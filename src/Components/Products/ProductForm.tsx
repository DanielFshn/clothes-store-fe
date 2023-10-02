import { Form, Formik, FormikHelpers } from "formik";
import { Box, Button, Container, Grid, MenuItem, Paper, Select, Typography } from "@mui/material";
import * as Yup from "yup";
import TextFieldComponent from "../HelperComponents/TextFieldComponent";
import { CategoryOption, GenderOption, SizeOption, productCreationDTO } from "./product.model";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductForm(props: productFormProps) {

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
                .max(20, "Max length is 20 characters!")
                .firstLetterUppercase(),
                description: Yup.string()
                .required("This field is required")
                .max(200, "Max length is 200 characters!").firstLetterUppercase(),
                price: Yup.number()
                    .required("This field is required")
                    .min(0, "Price cannot be negative"),
                    quantity: Yup.number().required("Quantity is required!"),
                    imageUrl: Yup.string().required("Image is required"),
                    // categoryId: Yup.object()
                    // .shape({
                    //   id: Yup.string().notOneOf([""], "Please select a Category"),
                    //   name: Yup.string().notOneOf([""], "Please select a Category"),
                    // })
                    // .required("Category is required"),
                    // size:Yup.object()
                    // .shape({
                    //   id: Yup.string().notOneOf([""], "Please select a Gender"),
                    //   name: Yup.string().notOneOf([""], "Please select a Gender"),
                    // })
                    // .required("Gender is required"),
                    // gender: Yup.object()
                    // .shape({
                    //   id: Yup.string().notOneOf([""], "Please select a Size"),
                    //   name: Yup.string().notOneOf([""], "Please select a Size"),
                    // })
                    // .required("Size is required"),

            })}
          >
            {(formikProps) => (
              <Form>
                <TextFieldComponent field="name" displayField="Category Name" />
                <TextFieldComponent field="description" displayField="Description" />
                <TextFieldComponent field="price" displayField="Price" />
                <TextFieldComponent field="quantity" displayField="Quantity" />
                <TextFieldComponent field="imageUrl" displayField="Image" />
                <div style={{ width: "30%" }}>
              {/* Category Dropdown */}
              <Typography variant="subtitle1" gutterBottom>
                    Category
                  </Typography>
              <Select
                label="Category"
                name="categoryId"
                onChange={(e) => {
                  const selectedOption = props.categories.find((option) => option.id === e.target.value);
                  //setSelectedCategory(selectedOption);
                  formikProps.setFieldValue("categoryId", selectedOption ? selectedOption.id : "");
                }}
              >
                {props.categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
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
                name="genderId"
                onChange={(e) => {
                  const selectedOption = props.genders.find((option) => option.id === e.target.value);
                  //setSelectedGender(selectedOption);
                  formikProps.setFieldValue("genderId", selectedOption ? selectedOption.id : "");
                }}
              >
                {props.genders.map((gender) => (
                  <MenuItem key={gender.id} value={gender.id}>
                    {gender.name}
                  </MenuItem>
                ))}
              </Select>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "30%", marginRight: "16px" }}>
                            {/* Size Dropdown */}
                            <Typography variant="subtitle1" gutterBottom>
                    Size
                  </Typography>
              <Select
                label="Size"
                name="sizeId"
                onChange={(e) => {
                  const selectedOption = props.sizes.find((option) => option.id === e.target.value);
                  formikProps.setFieldValue("sizeId", selectedOption ? selectedOption.id : "");
                }}
              >
                {props.sizes.map((size) => (
                  <MenuItem key={size.id} value={size.id}>
                    {size.name}
                  </MenuItem>
                ))}
              </Select>
              </div>
              </div>
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
                  <Link to={'/products'}>
                    <Button variant="contained" href="/products">
                      Cancel
                    </Button>
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
