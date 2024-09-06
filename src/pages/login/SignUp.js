import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import {
  Mail,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  backgroundColor: "#f5f5f5",
  padding: 20,
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

const Header = styled(Typography)(({ theme }) => ({
  color: "red",
  backgroundColor: "#f5f5f5",
  padding: theme.spacing(2),
  textAlign: "center",
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

export default function SignUp() {
  const nav = useNavigate();
  const [mode, setMode] = React.useState("light");
  const defaultTheme = createTheme({ palette: { mode } });
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!validateInputs()) {
  //     return; // Prevent submission if inputs are invalid
  //   }

  //   const data = new FormData(event.currentTarget);
  //   const signUpDetails = {
  //     name: data.get("name"),
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   };

  //   try {
  //     const response = await axios.post(
  //       "http://172.16.20.61:3003/user/register",
  //       signUpDetails
  //     );

  //     if (response.status === 200) {
  //       console.log("Sign Up successful:", response.data);
  //       alert("Signed Up successfully");
  //       nav("/");
  //     } else {
  //       console.error("Sign Up failed:", response.data.message);
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error during sign up:",
  //       error.response?.data?.message || error.message
  //     );
  //   }
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) {
      return; // Prevent submission if inputs are invalid
    }

    const data = new FormData(event.currentTarget);
    const signUpDetails = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const response = await axios.post(
        "http://172.16.20.61:3003/user/register",
        signUpDetails
      );
      console.log("response", response.status);

      // Check the response data for success/failure messages
      if (response.status === 201) {
        console.log("Sign Up successful:", response.data);

        nav("/");
      } else {
        console.error(
          "Sign Up failed:",
          response.data.message || "Unknown error"
        );
        alert("Sign Up failed: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error(
        "Error during sign up:",
        error.response?.data?.message || error.message
      );
      alert(
        "Error during sign up: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const validateInputs = () => {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!name.value) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Header variant="h4">tailwebs.</Header>
        <Card variant="outlined">
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <TextField
                error={nameError}
                helperText={nameErrorMessage}
                id="name"
                name="name"
                placeholder="Your Name"
                autoComplete="name"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={nameError ? "error" : "primary"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button onClick={handleClickShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                onClick={() => nav("/")}
                variant="text"
                sx={{ textDecoration: "underline" }}
              >
                Already have an account? Sign In
              </Button>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </ThemeProvider>
  );
}
