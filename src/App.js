import "./App.css";
import React from "react";
import Login from "./pages/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import SignUp from "./pages/login/SignUp";
import { Provider } from "react-redux";
import store from "./pages/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RequireAuth } from "./pages/login/Auth";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f5", // Set the default background color
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
          <BrowserRouter>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Routes>
              <Route element={<Login />} path="/" />
              <Route element={<SignUp />} path="/signup" />
              <Route element={<RequireAuth />}>
                <Route path="/home" element={<Home />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
