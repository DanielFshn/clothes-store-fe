import { BrowserRouter as Router , Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import routes from "./Config/route-config";
import configureValidations from "./Config/Validations";
configureValidations();
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.component/>}/>
          ))}
        </Routes>
        
        
      </Router>
    </>
  );
}

export default App;
