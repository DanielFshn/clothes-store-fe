import { Form, Formik, FormikHelpers } from "formik";
import { Box, Button, Grid, Paper } from "@mui/material";
import * as Yup from "yup";
import TextFieldComponent from "../HelperComponents/TextFieldComponent";
import { sizeCreationDTO } from "./size.model";

export default function CategoryForm(props: sizeFormProps) {
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
                })}
              >
                {(formikProps) => (
                  <Form>
                    <TextFieldComponent
                      field="name"
                      displayField="Category Name"
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
                        <Button variant="contained" href="/categories">
                          Cancel
                        </Button>
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

interface sizeFormProps {
  model: sizeCreationDTO;
  onSubmit(
    values: sizeCreationDTO,
    action: FormikHelpers<sizeCreationDTO>
  ): void;
}
