"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import projectTypeOptions from "/constants/enums/projectType";
import projectStatusOptions from "/constants/enums/projectStatus";
import languageOptions from "/constants/enums/language";

import PageContainer from "/components/container/PageContainer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  px: 3,
  maxHeight: "35rem",
  overflowY: "scroll",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const modalTitle = "Tạo dự án mới";

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

  // PROJECT TYPE
  const projectTypeLabel = "Loại dự án";
  const projectTypeDefaultOptionLabel = "Chọn loại dự án";
  const [projectType, setProjectType] = useState(-1);
  const [projectTypeError, setProjectTypeError] = useState({
    hasError: false,
    label: "",
  });
  const handleProjectTypeError = (value) => {
    setProjectTypeError({ hasError: false, label: "" });
  };
  const onProjectTypeChange = (e) => {
    setProjectType(e.target.value);
    handleProjectTypeError(e.target.value);
  };

  // PROJECT STATUS
  const projectStatusLabel = "Trạng thái dự án";
  const projectStatusDefaultOptionLabel = "Chọn trạng thái";
  const [projectStatus, setProjectStatus] = useState(-1);
  const [projectStatusError, setProjectStatusError] = useState({
    hasError: false,
    label: "",
  });
  const handleProjectStatusError = (value) => {
    setProjectStatusError({ hasError: false, label: "" });
  };
  const onProjectStatusChange = (e) => {
    setProjectStatus(e.target.value);
    handleProjectStatusError(e.target.value);
  };

  // LANGUAGE
  const languageLabel = "Ngôn ngữ";
  const languageDefaultOptionLabel = "Chọn ngôn ngữ";
  const [language, setLanguage] = useState(-1);
  const [languageError, setLanguageError] = useState({
    hasError: false,
    label: "",
  });
  const handleLanguageError = (value) => {
    setLanguageError({ hasError: false, label: "" });
  };
  const onLanguageChange = (e) => {
    setLanguage(e.target.value);
    handleLanguageError(e.target.value);
  };

  // PROJECT CATEGORY
  const [projectCategories, setProjectCategories] = useState([
    { id: "1", name: "Ngân hàng" },
  ]);

  const projectCategoryLabel = "Danh mục";
  const projectCategoryDefaultOptionLabel = "Chọn danh mục";
  const [projectCategory, setProjectCategory] = useState(-1); // Use -1 for the default disabled option
  const [projectCategoryError, setProjectCategoryError] = useState({
    hasError: false,
    label: "",
  });

  const handleProjectCategoryError = (value) => {
    setProjectCategoryError({ hasError: false, label: "" });
  };

  const onProjectCategoryChange = (e) => {
    setProjectCategory(e.target.value);
    handleProjectCategoryError(e.target.value);
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

  // ADVERTISEMENT STATUS
  const advertisementStatusLabel = "Quảng cáo dự án";
  const advertisementStatusSubLabel =
    "Dùng dự án này để quảng cáo trên trang chủ";
  const [advertisementStatus, setAdvertisementStatus] = useState(false);

  const handleAdvertisementStatusChange = (e) => {
    setAdvertisementStatus(e.target.checked);
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
        <Box sx={{ ...style }}>
          <Box
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pt: 2,
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              borderBottom: 1,
              zIndex: 1,
            }}
          >
            <Typography variant="h4" id="child-modal-title" sx={{ py: 2 }}>
              Tạo dự án mới
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
          <Grid sx={{ py: 2 }} component={"div"} container spacing={3}>
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

            {/* PROJECT TYPE */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{projectTypeLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={projectType}
                      onChange={onProjectTypeChange}
                      error={projectTypeError.hasError}
                    >
                      <MenuItem disabled value={-1}>
                        {projectTypeDefaultOptionLabel}
                      </MenuItem>
                      {projectTypeOptions.map((type, index) => (
                        <MenuItem key={type} value={index}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* PROJECT STATUS */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{projectStatusLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={projectStatus}
                      onChange={onProjectStatusChange}
                      error={projectStatusError.hasError}
                    >
                      <MenuItem disabled value={-1}>
                        {projectStatusDefaultOptionLabel}
                      </MenuItem>
                      {projectStatusOptions.map((status, index) => (
                        <MenuItem key={status} value={index}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* LANGUAGE */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{languageLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={language}
                      onChange={onLanguageChange}
                      error={languageError.hasError}
                    >
                      <MenuItem disabled value={-1}>
                        {languageDefaultOptionLabel}
                      </MenuItem>
                      {languageOptions.map((option, index) => (
                        <MenuItem key={option} value={index}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* PROJECT CATEGORY */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{projectCategoryLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={projectCategory}
                      onChange={onProjectCategoryChange}
                      error={projectCategoryError.hasError}
                    >
                      <MenuItem disabled value={-1}>
                        {projectCategoryDefaultOptionLabel}
                      </MenuItem>
                      {projectCategories.map((category, index) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
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

            {/* ADVERTISEMENT STATUS */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">
                    {advertisementStatusLabel}
                  </Typography>
                  <Typography variant="p">
                    {advertisementStatusSubLabel}
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={advertisementStatus}
                        onChange={handleAdvertisementStatusChange}
                        color="primary" // Use your preferred color
                      />
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* SUBMIT */}
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
