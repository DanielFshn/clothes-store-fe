import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import routes from "./Config/route-config";
import configureValidations from "./Config/Validations";
configureValidations();
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} exact={route.exact}>
              <route.component />
            </Route>
          ))}
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
