import { Redirect } from "react-router-dom";

export default function RedirectToHomePage() {
 return <Redirect to={{ pathname: "/" }} />;
}
