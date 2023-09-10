import axios from "axios";
import { sizeCreationDTO } from "./size.model";
import { urlCreateSize } from "../../Config/endpoinst";
import { Typography } from "@mui/material";
import SizeForm from "./SizeForm";

export default function CreateSize() {
  async function create(category: sizeCreationDTO) {
    try {
      var result = await axios.post(urlCreateSize, category);
      console.log(result);
      //navigate("/categories");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <br />
      <Typography variant="h6" align="center">
        Create Size
      </Typography>
      <SizeForm
        model={{ name: "" }}
        onSubmit={async (value) => {
          await create(value);
        }}
      ></SizeForm>
    </div>
  );
}
