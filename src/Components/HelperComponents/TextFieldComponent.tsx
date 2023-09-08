import { TextField } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import React from "react";

export default function TextFieldComponent(props: textFieldProps) {
  return (
    <div>
      <Field
        name={props.field}
        as={TextField}
        label= {props.displayField}
        fullWidth
        required
      />
      <ErrorMessage name= {props.field}>
        {(msg: string) => <div>{msg}</div>}
      </ErrorMessage>
    </div>
  );
}

interface textFieldProps {
  field: string;
  displayField: string;
}
