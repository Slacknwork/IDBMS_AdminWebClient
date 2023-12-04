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
  IconButton,
} from "@mui/material";

import { toast } from "react-toastify";
import { createSite } from "/api/siteServices";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

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

const pageTitle = "Tạo khu công trình";
const pageDescription = "Tạo một khu công trình mới";

export default function SiteModal({ children }) {
  const router = useRouter();
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
  const nameSubLabel = "Tên công trình";
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
  const addressSubLabel = "Địa chỉ công trình";
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

  // CONTACT NAME
  const contactNameLabel = "Họ và tên";
  const contactNameSubLabel = "Họ và tên người đại diện";
  const [contactName, setContactName] = useState("");
  const [contactNameError, setContactNameError] = useState({
    hasError: false,
    label: "",
  });
  const handleContactNameError = (value) => {
    setContactNameError({ hasError: false, label: "" });
  };
  const onContactNameChange = (e) => {
    setContactName(e.target.value);
    handleContactNameError(e.target.value);
  };

  // CONTACT LOCATION
  const contactLocationLabel = "Địa chỉ liên hệ";
  const contactLocationSubLabel = "Địa chỉ liên hệ với người đại diện";
  const [contactLocation, setContactLocation] = useState("");
  const [contactLocationError, setContactLocationError] = useState({
    hasError: false,
    label: "",
  });
  const handleContactLocationError = (value) => {
    setContactLocationError({ hasError: false, label: "" });
  };
  const onContactLocationChange = (e) => {
    setContactLocation(e.target.value);
    handleContactLocationError(e.target.value);
  };

  // CONTACT PHONE
  const contactPhoneLabel = "Số điện thoại";
  const contactPhoneSubLabel = "Số điện thoại liên hệ";
  const [contactPhone, setContactPhone] = useState("");
  const [contactPhoneError, setContactPhoneError] = useState({
    hasError: false,
    label: "",
  });
  const handleContactPhoneError = (value) => {
    setContactPhoneError({ hasError: false, label: "" });
  };
  const onContactPhoneChange = (e) => {
    setContactPhone(e.target.value);
    handleContactPhoneError(e.target.value);
  };

  // CONTACT EMAIL
  const contactEmailLabel = "Email";
  const contactEmailSubLabel = "Email liên hệ";
  const [contactEmail, setContactEmail] = useState("");
  const [contactEmailError, setContactEmailError] = useState({
    hasError: false,
    label: "",
  });
  const handleContactEmailError = (value) => {
    setContactEmailError({ hasError: false, label: "" });
  };
  const onContactEmailChange = (e) => {
    setContactEmail(e.target.value);
    handleContactEmailError(e.target.value);
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

  // DESCRIPTION
  const descriptionLabel = "Mô tả";
  const descriptionSubLabel = "Mô tả chi tiết";
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState({
    hasError: false,
    label: "",
  });
  const handleDescriptionError = (value) => {
    setDescriptionError({ hasError: false, label: "" });
  };
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
    handleDescriptionError(e.target.value);
  };

  const handleCreateSite = async () => {
    const createRequest = {
      name: name,
      description: description,
      companyCode: companyCode,
      contactName: contactName,
      contactEmail: contactEmail,
      contactPhone: contactPhone,
      contactLocation: contactLocation,
      address: address,
    };
    console.log(createRequest);

    try {
      const response = await createSite(createRequest);
      console.log(response);
      if (response.data != null) {
        toast.success("Thêm thành công!");
        router.push(`/sites/${response.data.id}`);
        // setOpen(false);
      } else {
        throw new Error("Create failed!");
      }
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  return (
    <Box>
      <Button variant="contained" disableElevation onClick={handleOpen}>
        {children}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }} container component="div">
          <Box
            container
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
              Tạo công trình mới
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
            {/* NAME */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">
                    {nameLabel}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
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
                  <Typography variant="h5">
                    {addressLabel}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
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

            {/* CONTACT NAME */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">
                    {contactNameLabel}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Typography variant="p">{contactNameSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={contactNameError.hasError}
                      variant="outlined"
                      value={contactName}
                      helperText={contactNameError.label}
                      onChange={onContactNameChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* CONTACT PHONE */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">
                    {contactPhoneLabel}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Typography variant="p">{contactPhoneSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={contactPhoneError.hasError}
                      variant="outlined"
                      value={contactPhone}
                      helperText={contactPhoneError.label}
                      onChange={onContactPhoneChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* CONTACT EMAIL */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">
                    {contactEmailLabel}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Typography variant="p">{contactEmailSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={contactEmailError.hasError}
                      variant="outlined"
                      value={contactEmail}
                      helperText={contactEmailError.label}
                      onChange={onContactEmailChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* CONTACT LOCATION */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">
                    {contactLocationLabel}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Typography variant="p">{contactLocationSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={contactLocationError.hasError}
                      variant="outlined"
                      value={contactLocation}
                      helperText={contactLocationError.label}
                      onChange={onContactLocationChange}
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

            {/* DESCRIPTION */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{descriptionLabel}</Typography>
                  <Typography variant="p">{descriptionSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      multiline
                      rows={4} // You can adjust the number of rows as needed
                      variant="outlined"
                      value={description}
                      error={descriptionError.hasError}
                      helperText={descriptionError.label}
                      onChange={onDescriptionChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* SUBMIT */}
            <Grid item xs={12} lg={12}>
              <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={handleCreateSite}
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
