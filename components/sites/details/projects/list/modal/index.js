"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import projectTypeOptions from "/constants/enums/projectType";
import projectStatusOptions from "/constants/enums/projectStatus";
import languageOptions from "/constants/enums/language";

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

export default function SiteModal({ children }) {
  // MODAL TOGGLE
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [projectCategories, setProjectCategories] = useState([
    { id: "1", name: "Ngân hàng" },
    { id: "2", name: "Bất động sản" },
    { id: "3", name: "Du lịch" },
    // Add more categories as needed
  ]);

  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    projectType: -1,
    projectTypeError: { hasError: false, label: "" },
    projectStatus: -1,
    projectStatusError: { hasError: false, label: "" },
    language: -1,
    languageError: { hasError: false, label: "" },
    projectCategory: -1,
    projectCategoryError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    advertisementStatus: false,
  });

  const validateInput = (field, value) => {
    switch (field) {
      case "name":
        return value.trim() === "" ? "Name cannot be empty" : "";
      // Add validation for other fields as needed
      default:
        return "";
    }
  };

  const handleInputChange = (field, value) => {
    const errorLabel = validateInput(field, value);
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: { hasError: !!errorLabel, label: errorLabel },
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
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
          <Grid
            container
            sx={{
              pt: 2,
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              zIndex: 1,
            }}
          >
            <Grid item xs={12} lg={12}>
              <Typography
                variant="h4"
                id="child-modal-title"
                sx={{ py: 2, borderBottom: 1 }}
              >
                Tạo dự án
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ py: 2 }} component={"div"} container spacing={3}>
            {/* NAME */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Tên</Typography>
                  <Typography variant="p">Tên gọi của dự án</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={formData.nameError.hasError}
                      variant="outlined"
                      value={formData.name}
                      helperText={formData.nameError.label}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* DESCRIPTION */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Mô tả</Typography>
                  <Typography variant="p">Mô tả dự án</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      multiline
                      rows={4}
                      variant="outlined"
                      value={formData.description}
                      error={formData.descriptionError.hasError}
                      helperText={formData.descriptionError.label}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* PROJECT TYPE */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Loại dự án</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={formData.projectType}
                      onChange={(e) =>
                        handleInputChange("projectType", e.target.value)
                      }
                      error={formData.projectTypeError.hasError}
                    >
                      <MenuItem disabled value={-1}>
                        Chọn loại dự án
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
                  <Typography variant="h5">Trạng thái</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={formData.projectStatus}
                      onChange={(e) =>
                        handleInputChange("projectStatus", e.target.value)
                      }
                      error={formData.projectStatusError.hasError}
                    >
                      <MenuItem disabled value={-1}>
                        Chọn trạng thái
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
                  <Typography variant="h5">Ngôn ngữ</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={formData.language}
                      onChange={(e) =>
                        handleInputChange("language", e.target.value)
                      }
                      error={formData.languageError.hasError}
                    >
                      <MenuItem disabled value={-1}>
                        Chọn ngôn ngữ
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
                  <Typography variant="h5">Hạng mục</Typography>
                  <Typography variant="p">Hạng mục của dự án</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={formData.projectCategory}
                      onChange={(e) =>
                        handleInputChange("projectCategory", e.target.value)
                      }
                      error={formData.projectCategoryError.hasError}
                    >
                      <MenuItem disabled value={-1}>
                        Chọn hạng mục
                      </MenuItem>
                      {projectCategories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* ADVERTISEMENT STATUS */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Quảng cáo</Typography>
                  <Typography variant="p">
                    Dùng dự án này để quảng cáo trên trang chủ
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.advertisementStatus}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "advertisementStatus",
                            e.target.checked
                          )
                        }
                        color="primary"
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
