import { Link } from "react-router-dom";
import { AppBar, Toolbar, Stack, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (user) {
        setAuthenticated(true);
      }
    } else {
      navigate("/login");
    }
  }, [navigate]); // Make sure to include navigate in the dependencies to avoid a lint warning

  // Conditional rendering
  if (!authenticated) {
    navigate("/login");
    return null;
  }
  const handleSubmit = async () => {
    setAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <AppBar position="static" style={{ backgroundColor: "white" }}>
      <Toolbar>
        <Typography
          variant="h4"
          color="black"
          style={{ textDecoration: "none", fontStyle: "italic" }}
          sx={{ flexGrow: 1 }}
          component={Link}
          to="/"
        >
          {" "}
          HL Courier Service
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/">
            Dashboard
          </Button>
          <Button component={Link} to="/createShipment">
            Create Shipment
          </Button>
          <Button style={{ color: "red" }} onClick={handleSubmit}>
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
