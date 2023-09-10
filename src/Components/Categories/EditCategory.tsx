import { useParams } from "react-router-dom";
import CategoryForm from "./CategoryForm";
import { Typography } from "@mui/material";
import axios from "axios";
import { categoryCreationDTO, editCategoryDTO } from "./category.model";
import { urlCategory, urlEditCategory } from "../../Config/endpoinst";
export default function EditCategory() {
  const { id }: any = useParams();
  async function edit(category: editCategoryDTO) {
    try {
      var result = await axios.put(`${urlEditCategory}/${id}`, category);

      console.log(id);
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
        Edit Category
      </Typography>
      <CategoryForm
        model={{ name: "" }}
        onSubmit={async (value) => {
          await edit(value);
        }}
      ></CategoryForm>
    
    </div>
  );
}
