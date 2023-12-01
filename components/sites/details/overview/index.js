"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Card,
  FormControl,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";

import PageContainer from "/components/container/PageContainer";
import SaveSiteModal from "./modal";
import DeleteSiteModal from "./deleteModal";
import { getSiteById } from "../../../../api/siteServices";
import { toast } from "react-toastify";

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

  // GET SITE DETAILS
  const [pageName, setPageName] = useState("Tên khu công trình");
  const [pageDescription, setPageDescription] = useState(
    "Mô tả khu công trình"
  );

  // CONTACT
  const contactLabel = "Thông tin liên hệ";

  const [siteId, setSiteId] = useState(params.id);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getSiteById(siteId);
          console.log(data);
          mapData(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Lỗi nạp dữ liệu từ hệ thống");
        }
      };
      fetchDataFromApi();
    }
  }, [siteId]);

  const mapData = (data) => {

    setName(data.name ?? "")
    setDescription(data.description ?? "")
    setContactLocation(data.contactLocation ?? "")
    setCompanyCode(data.companyCode ?? "")
    setContactName(data.contactName ?? "")
    setAddress(data.address ?? "")
    setContactPhone(data.contactPhone ?? "")
    setContactEmail(data.contactEmail ?? "")

  };

  const getAvatarContent = (name) => {
    const words = name.split(' ');
    const lastWord = words.length > 0 ? words[words.length - 1] : '';
    const firstCharacter = lastWord.charAt(0).toUpperCase();

    return firstCharacter;
  };

  return (
    <PageContainer title={pageName} description={pageDescription}>
      <Box sx={{ overflow: "auto" }}>
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
                {name}
              </Typography>
              <SaveSiteModal
                request={{
                  name: name,
                  description: description,
                  companyCode: companyCode,
                  contactName: contactName,
                  contactEmail: contactEmail,
                  contactPhone: contactPhone,
                  contactLocation: contactLocation,
                  address: address,
                }}
                siteId={siteId}
              >Lưu</SaveSiteModal>
              <DeleteSiteModal
                siteId={siteId}
              >Xoá</DeleteSiteModal>
            </Box>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Grid container columnSpacing={2} rowSpacing={4}>
              {/* NAME */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">
                      {nameLabel} <span style={{ color: "red" }}>*</span>
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
                    <Typography variant="p">
                      {contactLocationSubLabel}
                    </Typography>
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
                <Avatar sx={{ bgcolor: deepOrange[500], my: "auto" }}> {getAvatarContent(contactName)}</Avatar>
                <Box sx={{ my: "auto", mx: 2 }}>
                  <Typography variant="h6">{contactName}</Typography>
                  <Typography variant="p">{contactEmail}</Typography>
                  <br />
                  <Typography variant="p">{contactPhone}</Typography>
                  <br />
                </Box>
              </Box>
              <Box sx={{ display: "flex", mt: 2 }}>
                <Box sx={{ my: "auto", mx: 2 }}>
                  <Typography variant="h8">{contactLocation}</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
