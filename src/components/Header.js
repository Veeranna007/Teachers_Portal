import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../pages/redux/userActions";

const navItems = ["Home", "Logout"];

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/"); // Navigate to the login page
  };

  const handleNavClick = (item) => {
    if (item === "Logout") {
      handleLogout();
    } else if (item === "Home") {
      navigate("/home"); // Navigate to the home page
    }
  };
  console.log("Header - Current User:", userName); // Log the username used in Header

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "lightcoral",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome, {userName || "Guest"}
          </Typography>
          <Box>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "#fff" }}
                onClick={() => handleNavClick(item)}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default Header;
