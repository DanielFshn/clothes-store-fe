import React from "react";
import Authorize from "../../Auth/Authorize";
import AppAppBar from "./AppAppBar";
import ProductHero from "./ProductHero";
import ProductValues from "./ProductValues";
import ProductCategories from "./ProductCategories";
import ProductHowItWorks from "./ProductHowItWorks";
import ProductCTA from "./ProductCTA";
import ProductSmokingHero from "./ProductSmokingHero";
import AppFooter from "./AppFooter";


export default function IndexPage() {
  return (
    <div>
      {/* <Authorize
        authorized={<>You are authorize</>}
        notAuthorized={<>You are not Admin</>}
        role="Admin"
      ></Authorize>
      <br />
      Do te shfaqen produktet me ante te kartave */}
      <ProductHero />
      <ProductCategories />
      {/* <ProductCTA /> */}
      <ProductSmokingHero />
    </div>
  );
}
