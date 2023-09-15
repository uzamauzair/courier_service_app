import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { manageStatus } from "../apiLayers/manageStatus";
import { useNavigate, useParams } from "react-router-dom";

const defaultTheme = createTheme();

type CreateShipmentFormValues = {
  trackingNumber: string;
  status: string;
};

export default function ManageStatus() {
  const navigate = useNavigate();
  const { trackingNumber, status } = useParams<CreateShipmentFormValues>();
  const [values, setValues] = React.useState<CreateShipmentFormValues>({
    trackingNumber: trackingNumber!,
    status: status!,
  });

  const [trackingNumberError, setTrackingNumberError] =
    React.useState<string>("");
  const [statusError, setStatusError] = React.useState<string>("");
  const handleChange = (eName: any, eValue: any) => {
    const name = eName;
    const value = eValue;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    // Clear the error messages for the corresponding field
    if (name === "trackingNumber") {
      setTrackingNumberError("");
    } else if (name === "status") {
      setStatusError("");
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate the form fields
    if (!values.trackingNumber) {
      setTrackingNumberError("Tracking Number is required.");
      return;
    }
    if (!values.status) {
      setStatusError("Status is required.");
      return;
    }

    // Check if any errors exist
    if (trackingNumberError || statusError) {
      return; // Prevent form submission
    }
    try {
      const user = await manageStatus(values);
      if (user.status == 200) {
        toast.success("Shipment status successfully updated");
        navigate("/");
      }
    } catch (error) {
      toast.error("Error Occured while creating shipment");
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            color="black"
            style={{ textDecoration: "none" }}
            sx={{ flexGrow: 1 }}
          >
            Manage Shipment Status
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
              label="Tracking Number"
              name="trackingNumber"
              value={values.trackingNumber}
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              autoComplete="trackingNumber"
              autoFocus
              error={!!trackingNumberError} // Add error prop to highlight the field
              helperText={trackingNumberError} // Display error message
            />
            <FormControl variant="filled" sx={{ m: 1, minWidth: 240 }}>
              <InputLabel>Status</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                name="status"
                value={values.status}
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                }}
                error={!!trackingNumberError} // Add error prop to highlight the field
              >
                <MenuItem value="PENDING">PENDING</MenuItem>
                <MenuItem value="IN_TRANSIT">IN_TRANSIT</MenuItem>
                <MenuItem value="DELIVERED">DELIVERED</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
