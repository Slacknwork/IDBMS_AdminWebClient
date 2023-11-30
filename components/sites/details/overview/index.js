"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Card,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";

import SaveSiteModal from "./modal";

export default function Sites() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // NAME
  const nameLabel = "Tên khu công trình";
  const nameSubLabel = "Tên của khu công trình";
  const nameMin = 8;
  const nameMax = 50;
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState({
    hasError: false,
    label: "",
  });
  const handleNameError = (value) => {
    if (value?.length <= 0) {
      setNameError({
        hasError: true,
        label: "Tên khu công trình là cần thiết.",
      });
    } else if (value?.length < nameMin || value?.length > nameMax) {
      setNameError({
        hasError: true,
        label: `Tên phải từ ${nameMin} đến ${nameMax} ký tự`,
      });
    } else {
      setNameError({ hasError: false, label: "" });
    }
  };
  const onNameChange = (e) => {
    setName(e.target.value);
    handleNameError(e.target.value);
  };

  // ADDRESS
  const addressLabel = "Địa chỉ";
  const addressSubLabel = "Địa chỉ của khu công trình";
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState({
    hasError: false,
    label: "",
  });
  const handleAddressError = (value) => {
    setNameError({ hasError: false, label: "" });
  };
  const onAddressChange = (e) => {
    setName(e.target.value);
    handleNameError(e.target.value);
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

  // CONTACT
  const contactLabel = "Thông tin liên hệ";

  return (
    <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
      <Grid container columnSpacing={4} rowSpacing={4} sx={{ mt: 1 }}>
        <Grid
          item
          xs={12}
          lg={12}
          sx={{ borderBottom: 1, borderColor: "grey.500", py: 3 }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
            spacing={2}
          >
            <Typography variant="h2" sx={{ my: "auto" }}>
              Tên
            </Typography>
            <SaveSiteModal>Lưu</SaveSiteModal>
          </Box>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Grid container columnSpacing={2} rowSpacing={4}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">
                    {nameLabel}
                    <sup style={{ color: "red" }}>*</sup>
                  </Typography>
                  <Typography variant="p">{nameSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={nameError.hasError}
                      required
                      variant="outlined"
                      value={name}
                      onChange={onNameChange}
                      helperText={nameError?.label}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
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
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{companyAddressLabel}</Typography>
                  <Typography variant="p">{companyAddressSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={companyAddress.hasError}
                      variant="outlined"
                      value={companyAddress}
                      helperText={companyAddressError.label}
                      onChange={onCompanyAddressChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
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
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card
            variant="outlined"
            sx={{ p: 3, border: 1, borderColor: "gray" }}
          >
            <Typography variant="h5" sx={{ my: "auto" }}>
              {contactLabel}
            </Typography>
            <Box sx={{ display: "flex", mt: 2 }}>
              <Avatar sx={{ bgcolor: deepOrange[500], my: "auto" }}>N</Avatar>
              <Box sx={{ my: "auto", mx: 2 }}>
                <Typography variant="h6">Anthony N</Typography>
                <Typography variant="p">anthony@gmail.com</Typography>
                <br />
                <Typography variant="p">0123456789</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
