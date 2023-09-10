import { TextField } from "@mui/material";
import { error } from "console";
import { ErrorMessage, Field, useField } from "formik";
import React from "react";

export default function TextFieldComponent(props: textFieldProps) {
  const [field, meta] = useField(props.field);

  return (
    <div>
      <Field
        name={props.field}
        as={TextField}
        label={props.displayField}
        fullWidth
        required
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error ? meta.error : " "}
      />
      {/* <ErrorMessage name={props.field}>
        {(msg: string) => <div>{msg}</div>}
      </ErrorMessage> */}
    </div>
  );
}

interface textFieldProps {
  field: string;
  displayField: string;
  error?: string;
}
