"use client";

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const nameRequiredHelperText = "Thông tin này là cần thiết";

export default function SiteModal({ children }) {
  // MODAL TOGGLE
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // NAME
  const nameLabel = "Tên";
  const nameSubLabel = "Họ và tên của bạn";
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState({
    hasError: false,
    label: "",
  });
  const handleNameError = (value) => {
    setNameError({ hasError: false, label: "" });
  };
  const onNameChange = (e) => {
    setName(e.target.value);
    handleNameError(e.target.value);
  };

  // ADDRESS
  const addressLabel = "Địa chỉ";
  const addressSubLabel = "Địa chỉ của bạn";
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState({
    hasError: false,
    label: "",
  });
  const handleAddressError = (value) => {
    setAddressError({ hasError: false, label: "" });
  };
  const onAddressChange = (e) => {
    setAddress(e.target.value);
    handleAddressError(e.target.value);
  };

  // COMPANY NAME
  const companyNameLabel = "Tên công ty";
  const companyNameSubLabel = "Tên hợp pháp của công ty";
  const [companyName, setCompanyName] = useState("");
  const [companyNameError, setCompanyNameError] = useState({
    hasError: false,
    label: "",
  });
  const handleCompanyNameError = (value) => {
    setCompanyNameError({ hasError: false, label: "" });
  };
  const onCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
    handleCompanyNameError(e.target.value);
  };

  // COMPANY ADDRESS
  const companyAddressLabel = "Địa chỉ công ty";
  const companyAddressSubLabel = "Địa chỉ trụ sở chính của công ty";
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyAddressError, setCompanyAddressError] = useState({
    hasError: false,
    label: "",
  });
  const handleCompanyAddressError = (value) => {
    setCompanyAddressError({ hasError: false, label: "" });
  };
  const onCompanyAddressChange = (e) => {
    setCompanyAddress(e.target.value);
    handleCompanyAddressError(e.target.value);
  };

  // COMPANY CODE
  const companyCodeLabel = "Mã công ty";
  const companyCodeSubLabel = "Mã số doanh nghiệp của công ty";
  const [companyCode, setCompanyCode] = useState("");
  const [companyCodeError, setCompanyCodeError] = useState({
    hasError: false,
    label: "",
  });
  const handleCompanyCodeError = (value) => {
    setCompanyCodeError({ hasError: false, label: "" });
  };
  const onCompanyCodeChange = (e) => {
    setCompanyCode(e.target.value);
    handleCompanyCodeError(e.target.value);
  };

  return (
    <Box>
      <Button
        sx={{ mx: 2 }}
        variant="contained"
        disableElevation
        onClick={handleOpen}
      >
        {children}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Typography
                variant="h3"
                id="child-modal-title"
                sx={{ py: 2, borderBottom: 1 }}
              >
                Tạo công trình mới
              </Typography>
            </Grid>

            {/* NAME */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{nameLabel}</Typography>
                  <Typography variant="p">{nameSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={nameError.hasError}
                      variant="outlined"
                      value={name}
                      helperText={nameError.label}
                      onChange={onNameChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* ADDRESS */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{addressLabel}</Typography>
                  <Typography variant="p">{addressSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={addressError.hasError}
                      variant="outlined"
                      value={address}
                      helperText={addressError.label}
                      onChange={onAddressChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* COMPANY NAME */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{companyNameLabel}</Typography>
                  <Typography variant="p">{companyNameSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={companyNameError.hasError}
                      variant="outlined"
                      value={companyName}
                      helperText={companyNameError.label}
                      onChange={onCompanyNameChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* COMPANY ADDRESS */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{companyAddressLabel}</Typography>
                  <Typography variant="p">{companyAddressSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={companyAddressError.hasError}
                      variant="outlined"
                      value={companyAddress}
                      helperText={companyAddressError.label}
                      onChange={onCompanyAddressChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* COMPANY CODE */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{companyCodeLabel}</Typography>
                  <Typography variant="p">{companyCodeSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={companyCodeError.hasError}
                      variant="outlined"
                      value={companyCode}
                      helperText={companyCodeError.label}
                      onChange={onCompanyCodeChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box
                sx={{ display: "flex", justifyContent: "flex-end" }}
                spacing={2}
              >
                <Button
                  variant="contained"
                  disableElevation
                  onClick={handleClose}
                >
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
