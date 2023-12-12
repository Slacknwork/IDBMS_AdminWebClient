"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IconPencil } from "@tabler/icons-react";

import projectDocumentCategoryOptions from "/constants/enums/projectDocumentCategory";

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

export default function DocumentModal({ children, projectDocument }) {
  // MODAL TOGGLE
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    name: projectDocument?.name || "",
    nameError: { hasError: false, label: "" },
    description: projectDocument?.description || "",
    descriptionError: { hasError: false, label: "" },
    file: null,
    fileError: { hasError: false, label: "" },
    url: projectDocument?.url || "",
    category: projectDocument?.category || -1,
    categoryError: { hasError: false, label: "" },
    projectDocumentTemplate: projectDocument?.projectDocumentTemplate || {
      id: 1,
      name: "",
    },
    projectDocumentTemplateError: { hasError: false, label: "" },
    isPublicAdvertisement: projectDocument?.isPublicAdvertisement || false,
    isPublicAdvertisementError: { hasError: false, label: "" },
    // ... other fields if needed
  });

  const projectDocumentTemplateOptions = [
    { id: 1, name: "Template1" },
    { id: 2, name: "Template2" },
    // Add more template options as needed
  ];

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: { hasError: false, label: "" }, // Reset error on change
    }));
  };

  const handleFileInputChange = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      FileInput: file,
      FileInputError: { hasError: false, label: "" }, // Reset error on change
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: !formData[field],
      [`${field}Error`]: { hasError: false, label: "" }, // Reset error on change
    }));
  };

  return (
    <Box>
      <Button
        sx={projectDocument ? { mx: 2 } : {}}
        size={projectDocument ? "small" : ""}
        variant="contained"
        disableElevation
        onClick={handleOpen}
        endIcon={projectDocument && <IconPencil></IconPencil>}
      >
        {children}
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
              Thêm tài liệu
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
            component={"div"}
            container
            spacing={3}
          >
            {/* NAME */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Tên</Typography>
                  <Typography variant="p">Nhập tên</Typography>
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

            {/* FILE INPUT */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Tệp đính kèm</Typography>
                  <Typography variant="p">Chọn tệp</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <input
                      type="file"
                      onChange={(e) => handleFileInputChange(e.target.files[0])}
                    />
                    {/* Add error handling for file input if needed */}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* PROJECT DOCUMENT CATEGORY */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Danh mục tài liệu</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={formData.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      error={formData.categoryError?.hasError}
                    >
                      <MenuItem disabled value={-1}>
                        Chọn danh mục tài liệu
                      </MenuItem>
                      {projectDocumentCategoryOptions.map((category, index) => (
                        <MenuItem key={category} value={index}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* PROJECT DOCUMENT TEMPLATE */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Mẫu tài liệu</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={formData.projectDocumentTemplate?.id || -1}
                      onChange={(e) =>
                        handleInputChange(
                          "projectDocumentTemplate",
                          projectDocumentTemplateOptions.find(
                            (template) => template.id == e.target.value
                          )
                        )
                      }
                      error={formData.projectDocumentTemplateError?.hasError}
                    >
                      <MenuItem disabled value={-1}>
                        Chọn mẫu tài liệu
                      </MenuItem>
                      {projectDocumentTemplateOptions.map((template) => (
                        <MenuItem key={template.id} value={template.id}>
                          {template.name}
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
                  <Typography variant="h5">Mô tả</Typography>
                  <Typography variant="p">Nhập mô tả</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      multiline
                      rows={4}
                      error={formData.descriptionError.hasError}
                      variant="outlined"
                      value={formData.description}
                      helperText={formData.descriptionError.label}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* IS PUBLIC ADVERTISEMENT */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Công khai</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl>
                    <Checkbox
                      checked={formData.isPublicAdvertisement}
                      onChange={() =>
                        handleCheckboxChange("isPublicAdvertisement")
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* SUBMIT */}
            <Grid item xs={12} lg={12}>
              <Box
                sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}
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
