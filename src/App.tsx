import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import routes from "./Config/route-config";
import configureValidations from "./Config/Validations";
import { useEffect, useState } from "react";
import { claim } from "./Auth/auth.models";
import AuthenticationContext from "./Auth/AuthenticationContext";
import "./Uitls/App.css";
import AppFooter from "./Components/Home/AppFooter";
import LoadingSpinner from "./Uitls/LoadSpinner";
configureValidations();
function App() {
  const [claims, setClaims] = useState<claim[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading
  function isAdmin() {
    return (
      claims.findIndex(
        (claim) => claim.name === "role" && claim.value === "Admin"
      ) > -1
    );
  }
  useEffect(() => {
    // Simulate an asynchronous operation (e.g., loading data) with a timeout
    setTimeout(() => {
      setLoading(false); // Set loading to false when done loading
    }, 1000); // Adjust the timeout as needed
  }, []);


  return (
    <> 
    {loading ? ( // Render the LoadingSpinner when loading is true
    <LoadingSpinner />) : (
      <Router>
        <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
          <Navbar />
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.isAdmin && !isAdmin() ? (
                    <>You are not aothorized to see this page!</>
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
          </Routes>
        </AuthenticationContext.Provider>
      </Router>
  )}
        <AppFooter />
    </>
  );
}

export default App;
