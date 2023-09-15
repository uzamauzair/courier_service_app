import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import CreateShipment from "./components/CreateShipment";
import ManageStatus from "./components/ManageStatus";

const App = () => {
  const location = useLocation();
  // Define an array of paths where you don't want to show the navbar
  const excludedPaths = ["/register", "/login"];

  // Check if the current path is in the excluded paths
  const shouldShowNavbar = !excludedPaths.includes(location.pathname);
  return (
    <>
      {shouldShowNavbar && <NavBar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/createShipment" element={<CreateShipment />} />
        <Route
          path="/managestatus/:trackingNumber/:status"
          element={<ManageStatus />}
        />
      </Routes>
    </>
  );
};

export default App;
