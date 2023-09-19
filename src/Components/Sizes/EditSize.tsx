import { useNavigate, useParams } from "react-router-dom";
import { Alert, AlertTitle, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import {urlEditSize, urlGetSizeById } from "../../Config/endpoinst";
import { useEffect, useState } from "react";
import TestComponent from "../../Uitls/TestComponent";
import SizeForm from "./SizeForm";
import { sizeEditDTO } from "./size.model";

export default function EditSize() {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [category, setCategory] = useState<sizeEditDTO>();
  const [error, setErrors] = useState<string | null>(null);
  useEffect(() => {
    axios
      .get(`${urlGetSizeById}?id=${id}`)
      .then((response: AxiosResponse<sizeEditDTO>) => {
        setCategory(response.data);
      });
  }, [id]);

  async function edit(sizeToEdit: sizeEditDTO) {
    try {
      await axios.put(`${urlEditSize}/${id}`, sizeToEdit);
      navigate(`/sizes`);

      //navigate("/categories");
    } catch (error: any) {
      if (error && error.response) {
        const errorResponse = error.response.data;
        const errorMessage = `${errorResponse.detail}`;
        setErrors(errorMessage);
      }
    }
  }
  return (
    <div>
      {error && ( // Conditional rendering of error message
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <br />
      <Typography variant="h6" align="center">
        Edit Size
      </Typography>
      {category ? (
        <SizeForm
          model={category}
          onSubmit={async (value) => {
            await edit(value);
          }}
        ></SizeForm>
      ) : (
        //TestComponent do te zevendesohet psh me nje component te tipit LoadConoponent
        <TestComponent />
      )}
    </div>
  );
}
