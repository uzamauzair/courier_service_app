import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import { LoginUser } from "../apiLayers/login";
import { emailFormating, passwordFormating } from "../utils/constants";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://halflife.io/">
        Half Life
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

type LoginFormValues = {
  email: string;
  password: string;
};
export default function Login() {
  const [values, setValues] = React.useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("");
  const handleChange = (eName: any, eValue: any) => {
    const name = eName;
    const value = eValue;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    // Clear the error messages for the corresponding field
    if (name === "email") {
      setEmailError("");
    } else if (name === "password") {
      setPasswordError("");
    }
  };

  // Define regular expressions for password and email formats
  const passwordFormat = passwordFormating;
  const emailFormat = emailFormating;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate the form fields
    if (!values.email) {
      setEmailError("Email is required.");
      return;
    }
    if (!values.password) {
      setPasswordError("Password is required.");
      return;
    }

    // Check if the email and password meet the required format
    if (!passwordFormat.test(values.password)) {
      setPasswordError(
        "Password should be between 6 to 20 characters and should contain at least one numeric, one uppercase, and one lowercase letter"
      );
      return;
    }

    if (!emailFormat.test(values.email)) {
      setEmailError("Invalid Email address");
      return;
    }
    // Check if any errors exist
    if (emailError || passwordError) {
      return; // Prevent form submission
    }
    try {
      const user = await LoginUser(values);
      if (user.status == 200) {
        console.log("User ", user.user);

        localStorage.setItem("token", user.user.toString());
        toast.success("Login Success");
        window.location.href = "/dashboard";
      } else {
        const error = user.message;
        toast.error(error);
      }
    } catch (error) {
      toast.error("Error occured while login");
      setValues({
        email: "",
        password: "",
      });
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={values.email}
              autoComplete="email"
              autoFocus
              error={!!emailError}
              helperText={emailError}
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              value={values.password}
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!passwordError} // Add error prop to highlight the field
              helperText={passwordError} // Display error message
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
