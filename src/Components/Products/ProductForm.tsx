import React from "react";
import { productCreationDTO } from "./product.model";
import { Form, Formik, FormikHelpers } from "formik";
import { Box, Button, Grid, Paper } from "@mui/material";
import TextFieldComponent from "../HelperComponents/TextFieldComponent";
import * as Yup from "yup";
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
                    .max(50, "Max length is 50 characters!"),
                  description: Yup.string()
                    .required("This field is required")
                    .max(200, "Max length is 200 characters!"),
                  price: Yup.number()
                    .required("This field is required")
                    .min(0, "Price cannot be negative"),
                    quantity: Yup.number().required("Quantity is required!"),

                  imageUrl: Yup.mixed().required("Image is required"),
                  categoryId: Yup.string().required("Category is required"),
                  genderId: Yup.string().required("Gender is required"),
                  sizeId: Yup.string().required("Size is required"),
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
                    <TextFieldComponent field="sizeId" displayField="Size" />
                    <TextFieldComponent
                      field="genderId"
                      displayField="Gender"
                    />
                    <TextFieldComponent
                      field="categoryId"
                      displayField="Category ID"
                    />
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
}
