import { Typography } from "@mui/material";
import axios from "axios";
import SizeForm from "./SizeForm";
import { sizeEditDTO } from "./size.model";
import { urlEditSize } from "../../Config/endpoinst";
import { useParams } from "react-router-dom";

export default function EditSize() {
  var { id }: any = useParams();

  async function editSize(size: sizeEditDTO) {
    try {
      var result = await axios.put(`${urlEditSize}/${id}`, size);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <br />
      <Typography variant="h6" align="center">
        Edit Size
      </Typography>
      <SizeForm
        model={{ name: "" }}
        onSubmit={async (value) => {
          await editSize(value);
        }}
      ></SizeForm>
    </div>
  );
}
