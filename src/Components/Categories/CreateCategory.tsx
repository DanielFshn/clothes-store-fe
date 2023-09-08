import { Typography } from "@mui/material";
import CategoryForm from "./CategoryForm";
import { categoryCreationDTO } from "./category.model";
import axios from "axios";
//import { useNavigate } from 'react-router-dom';
export default function CreateCategory() {
  //const navigate = useNavigate();
  async function create(category: categoryCreationDTO) {
    try {
      var result = await axios.post(
        "https://localhost:7001/api/categories/insert-category",
        category
      );
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
        Create Category
      </Typography>
      <CategoryForm
        model={{ name: "" }}
        onSubmit={async (value) => {
          await create(value);
        }}
      ></CategoryForm>
    </div>
  );
}
