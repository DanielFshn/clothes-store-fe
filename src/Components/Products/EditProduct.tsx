import React from "react";
import { useParams } from "react-router-dom";

export default function EditProduct() {
  const { id }: any = useParams();
  return <div>The id is {id} </div>;
}
