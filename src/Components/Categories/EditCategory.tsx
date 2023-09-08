import { useParams } from "react-router-dom";
import CategoryForm from "./CategoryForm";
import { Typography } from "@mui/material";
export default function EditCategory() {
  const { id }: any = useParams();

  return (
    <div>
      <br />
      <Typography variant="h6" align="center">
        Edit Category
      </Typography>{" "}
      <CategoryForm
        model={{ name: "" }}
        onSubmit={async (value) => {
          await new Promise((r) => setTimeout(r, 3000));
          console.log(id);
          console.log(value);
        }}
      ></CategoryForm>
    </div>
  );
}
