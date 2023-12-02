"use client";

import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import transactionTypeOptions from "/constants/enums/transactionType";
import transactionStatusOptions from "/constants/enums/transactionStatus";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  overflowY: "auto",
  boxShadow: 24,
};

export default function CreateTransactionModal({ children }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const userList = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Smith" },
    // Add more users as needed
  ];

  const warrantyClaimList = [
    { id: 1, name: "Extended Warranty" },
    { id: 2, name: "Manufacturer's Warranty" },
    { id: 3, name: "Limited Lifetime Warranty" },
    { id: 4, name: "Accidental Damage Protection" },
    // Add more warranty claims as needed
  ];

  const [formData, setFormData] = useState({
    type: "",
    typeError: { hasError: false, label: "" },
    amount: 0,
    amountError: { hasError: false, label: "" },
    user: "",
    userError: { hasError: false, label: "" },
    warrantyClaim: "",
    warrantyClaimError: { hasError: false, label: "" },
    status: "",
    statusError: { hasError: false, label: "" },
    transactionReceiptImage: null,
    transactionReceiptImageError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: { hasError: false, label: "" },
    }));
  };

  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const handleNumberChange = (field, value) => {
    const val = parseFloat(value);
    handleInputChange(field, val);
  };

  const handleAutocompleteChange = (field, selectedOption) => {
    handleInputChange(field, selectedOption);
  };

  const handleFileInputChange = (file) => {
    handleInputChange("transactionReceiptImage", file);
  };

  const handleCheckboxChange = (fieldName, checked) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: !formData[fieldName],
    }));
  };

  return (
    <Box>
      <Button variant="contained" disableElevation onClick={handleOpen}>
        <span>{children}</span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }} component="div">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pt: 2,
              mx: 3,
              height: "5rem",
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              borderBottom: 1,
              zIndex: 1,
            }}
          >
            <Typography variant="h4" id="child-modal-title" sx={{ py: 2 }}>
              Tạo giai đoạn
            </Typography>
            <IconButton
              aria-label="close"
              sx={{
                my: "auto",
              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid
            sx={{ px: 3, my: 1, maxHeight: "30rem", overflowY: "auto" }}
            container
            spacing={3}
          >
            {/* TYPE */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">
                    Transaction Type<span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    {/* Replace 'transactionTypeOptions' with your actual options */}
                    <Select
                      error={formData.typeError.hasError}
                      value={formData.type}
                      onChange={(e) =>
                        handleInputChange("type", e.target.value)
                      }
                      variant="outlined"
                    >
                      {transactionTypeOptions.map((option, index) => (
                        <MenuItem key={option} value={index}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{formData.typeError.label}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* AMOUNT */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">
                    Amount<span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      type="number"
                      variant="outlined"
                      value={formData.amount}
                      error={formData.amountError.hasError}
                      helperText={formData.amountError.label}
                      onChange={(e) =>
                        handleNumberChange("amount", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* USER */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">User</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    {/* Replace 'userAutocompleteOptions' with your actual options */}
                    <Autocomplete
                      options={userList}
                      value={formData.user}
                      getOptionLabel={(option) => option.name}
                      onChange={(_, value) =>
                        handleAutocompleteChange("user", value)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={formData.userError.hasError}
                          helperText={formData.userError.label}
                          variant="outlined"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* WARRANTY CLAIM */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Warranty Claim</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    {/* Replace 'warrantyClaimAutocompleteOptions' with your actual options */}
                    <Autocomplete
                      options={warrantyClaimList}
                      value={formData.warrantyClaim}
                      getOptionLabel={(option) => option.name}
                      onChange={(_, value) =>
                        handleAutocompleteChange("warrantyClaim", value)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={formData.warrantyClaimError.hasError}
                          helperText={formData.warrantyClaimError.label}
                          variant="outlined"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* STATUS */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Status</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    {/* Replace 'transactionStatusOptions' with your actual options */}
                    <Select
                      error={formData.statusError.hasError}
                      value={formData.status}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                      variant="outlined"
                    >
                      {transactionStatusOptions.map((option, index) => (
                        <MenuItem key={option} value={index}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {formData.statusError.label}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* TRANSACTION RECEIPT IMAGE */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">
                    Transaction Receipt Image
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Input
                      type="file"
                      onChange={(e) => handleFileInputChange(e.target.files[0])}
                    />
                    <FormHelperText>
                      {formData.transactionReceiptImageError.label}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* SUBMIT */}
            <Grid item xs={12} lg={12}>
              <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" disableElevation>
                  Tạo
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
