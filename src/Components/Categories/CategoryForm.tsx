import { Form, Formik, FormikHelpers } from "formik";
import { Button, Container, Grid } from "@mui/material";
import * as Yup from "yup";
import TextFieldComponent from "../HelperComponents/TextFieldComponent";
import { categoryCreationDTO } from "./category.model";

export default function CategoryForm(props: categoryFormProps) {
  return (
    <div>
      <Container maxWidth="sm">
        <br />
        <br />
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
      </Container>
    </div>
  );
}

interface categoryFormProps {
  model: categoryCreationDTO;
  onSubmit(
    values: categoryCreationDTO,
    action: FormikHelpers<categoryCreationDTO>
  ): void;
}
