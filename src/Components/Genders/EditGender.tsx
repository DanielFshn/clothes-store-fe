import { useNavigate, useParams } from "react-router-dom";
import { Alert, AlertTitle, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { urlEditGender, urlGetGenderById } from "../../Config/endpoinst";
import { useEffect, useState } from "react";
import TestComponent from "../../Uitls/TestComponent";
import { editGenderDTO } from "./gender.model";
import GenderForm from "./GenderForm";

export default function EditGender() {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [gender, setGender] = useState<editGenderDTO>();
  const [error, setErrors] = useState<string | null>(null);
  useEffect(() => {
    axios
      .get(`${urlGetGenderById}?id=${id}`)
      .then((response: AxiosResponse<editGenderDTO>) => {
        setGender(response.data);
      });
  }, [id]);

  async function edit(genderToEdit: editGenderDTO) {
    try {
      await axios.put(`${urlEditGender}/${id}`, genderToEdit);
      navigate(`/categories`);

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
        Edit Gender
      </Typography>
      {gender ? (
        <GenderForm
          model={gender}
          onSubmit={async (value) => {
            await edit(value);
          }}
        ></GenderForm>
      ) : (
        //TestComponent do te zevendesohet psh me nje component te tipit LoadConoponent
        <TestComponent />
      )}
    </div>
  );
}
