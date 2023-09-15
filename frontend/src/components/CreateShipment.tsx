import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createShipment } from "../apiLayers/createShipment";

const defaultTheme = createTheme();

type CreateShipmentFormValues = {
  senderName: string;
  senderAddress: string;
  recipientName: string;
  recipientAddress: string;
  description: string;
};

export default function CreateShipment() {
  const [values, setValues] = React.useState<CreateShipmentFormValues>({
    senderName: "",
    senderAddress: "",
    recipientName: "",
    recipientAddress: "",
    description: "",
  });

  const [senderNameError, setSenderNameError] = React.useState<string>("");
  const [senderAddressError, setSenderAddressError] =
    React.useState<string>("");
  const [recipientNameError, setRecipientNameError] =
    React.useState<string>("");
  const [recipientAddressError, setRecipientAddressError] =
    React.useState<string>("");
  const [descriptionError, setDescriptionError] = React.useState<string>("");

  const handleChange = (eName: any, eValue: any) => {
    const name = eName;
    const value = eValue;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    // Clear the error messages for the corresponding field
    if (name === "senderName") {
      setSenderNameError("");
    } else if (name === "senderAddress") {
      setSenderAddressError("");
    } else if (name === "recipientName") {
      setRecipientNameError("");
    } else if (name === "recipientAddress") {
      setRecipientAddressError("");
    } else if (name === "description") {
      setDescriptionError("");
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate the form fields
    if (!values.senderName) {
      setSenderNameError("Sender Name is required.");
      return;
    }
    if (!values.senderAddress) {
      setSenderAddressError("Sender Address is required.");
      return;
    }
    if (!values.recipientName) {
      setRecipientNameError("Recipient Name is required.");
      return;
    }
    if (!values.recipientAddress) {
      setRecipientAddressError("Recipient Address is required.");
      return;
    }
    if (!values.description) {
      setDescriptionError("Description is required.");
      return;
    }
    // Check if any errors exist
    if (
      senderNameError ||
      senderAddressError ||
      recipientNameError ||
      recipientAddressError ||
      descriptionError
    ) {
      return; // Prevent form submission
    }
    try {
      const user = await createShipment(values);
      if (user.status == 200) {
        toast.success("Shipment successfully created");
        setValues({
          senderName: "",
          senderAddress: "",
          recipientName: "",
          recipientAddress: "",
          description: "",
        });
      }
    } catch (error) {
      toast.error("Error Occured while creating shipment");
      setValues({
        senderName: "",
        senderAddress: "",
        recipientName: "",
        recipientAddress: "",
        description: "",
      });
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
            Create Shipment
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
              label="Sender Name"
              name="senderName"
              value={values.senderName}
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              autoComplete="email"
              autoFocus
              error={!!senderNameError} // Add error prop to highlight the field
              helperText={senderNameError} // Display error message
            />
            <TextField
              margin="normal"
              fullWidth
              label="Sender Address"
              name="senderAddress"
              value={values.senderAddress}
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              autoComplete="name"
              autoFocus
              error={!!senderAddressError} // Add error prop to highlight the field
              helperText={senderAddressError} // Display error message
            />
            <TextField
              margin="normal"
              fullWidth
              name="recipientName"
              value={values.recipientName}
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              label="Receipient Name"
              autoComplete="recipientName"
              error={!!recipientNameError} // Add error prop to highlight the field
              helperText={recipientNameError} // Display error message
            />
            <TextField
              margin="normal"
              fullWidth
              name="recipientAddress"
              value={values.recipientAddress}
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              label="Receipient Address"
              autoComplete="recipientAddress"
              error={!!recipientAddressError} // Add error prop to highlight the field
              helperText={recipientAddressError} // Display error message
            />
            <TextField
              label="Description"
              name="description"
              multiline
              fullWidth
              value={values.description}
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              rows={2}
              error={!!descriptionError} // Add error prop to highlight the field
              helperText={descriptionError} // Display error message
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
