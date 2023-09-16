import React from "react";
import Authorize from "../../Auth/Authorize";

export default function IndexPage() {
  return (
    <div>
      <Authorize
        authorized={<>You are authorize</>}
        notAuthorized={<>You are not Admin</>}
        role="Admin"
      ></Authorize>
      <br />
      Do te shfaqen produktet me ante te kartave
    </div>
  );
}
