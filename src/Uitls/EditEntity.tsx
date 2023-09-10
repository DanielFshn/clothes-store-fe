// import { Typography } from "@mui/material";
// import axios, { AxiosResponse } from "axios";
// import React, { ReactElement, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import TestComponent from "./TestComponent";

// export default function EditEntity<TCreation, TRead>(
//   props: editEntityProps<TCreation, TRead>
// ) {
//   const { id }: any = useParams();
//   const [entity, setEntity] = useState<TCreation>();
//   const [errors, setErrors] = useState<string[]>([]);

//   useEffect(() => {
//     axios.get(`${props.url}/${id}`).then((response: AxiosResponse<TRead>) => {
//       setEntity(props.transform(response.data));
//     });
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   async function edit(entityToEdit: TCreation) {
//     try {
//       var result = await axios.put(`${props.url}/${id}`, entityToEdit);
//       console.log(id);
//       console.log(result);
//       //navigate("/categories");
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   return (
//     <div>
//       <br />
//       <Typography variant="h6" align="center">
//         Edit {props.entiityName}
//       </Typography>
//       {entity ? 
//         props.children(entity,edit)
//        : <TestComponent />}
//     </div>
//   );
// }

// interface editEntityProps<TCreation, TRead> {
//   url: string;
//   entiityName: string;
//   transform(entity: TRead): TCreation;
//   children(entity: TCreation, edit : (entity : TCreation) => void) : ReactElement;
// }

// EditEntity.defaultProps = {
//   transform: (entity: any) => entity,
// };

import React from 'react'

export default function EditEntity() {
  return (
    <div>
      
    </div>
  )
}
