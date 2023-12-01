"use client";

import { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
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
import advertisementStatusOptions from "/constants/enums/advertisementStatus";
import { createProject, getProjectsBySiteId } from "/api/projectServices";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { getProjectCategories } from "/api/projectCategoryServices";

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

export default function CreateModal({ children, onSubmit }) {
  const params = useParams();
  // MODAL TOGGLE
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
    advertisementStatus: -1,
    basedOnDecorProject: [],
    basedOnDecorProjectError: { hasError: false, label: "" },
    estimatedPrice: 0,
    estimatedPriceError: { hasError: false, label: "" },
    finalPrice: 0,
    finalPriceError: { hasError: false, label: "" },
    totalWarrantyPaid: 0,
    totalWarrantyPaidError: { hasError: false, label: "" },
    area: 0,
    areaError: { hasError: false, label: "" },
    estimateBusinessDay: 0,
    estimateBusinessDayError: { hasError: false, label: "" },
  });

  const validateInput = (field, value) => {
    switch (field) {
      case "name":
        return value.trim() === "" ? "Tên không thể để trống" : "";
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

  const [decorProjects, setDecorProjects] = useState([]);
  const initialized = useRef(false);

  const [loading, setLoading] = useState(true);
  const [projectCategories, setProjectCategories] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const listCategories = await getProjectCategories();
          console.log(listCategories);
          setProjectCategories(listCategories);

          const projects = await getProjectsBySiteId(params.id);
          console.log(projects);
          setDecorProjects(projects.filter((project) => project.type === 0));

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Lỗi nạp dữ liệu từ hệ thống");
        }
      };
      fetchDataFromApi();
    }
  }, []);

  const handleCreate = async () => {
    const createRequest = {
      name: formData.name,
      description: formData.description,
      type: formData.projectType,
      projectCategoryId: formData.projectCategory,
      createdAdminUsername: "admin.username",
      createdByAdminId: "7C2B4371-E768-4D01-9E15-648091A7D9B7",
      estimatedPrice: null,
      finalPrice: null,
      totalWarrantyPaid: null,
      area: 0,
      estimateBusinessDay: null,
      language: formData.language,
      status: formData.projectStatus,
      advertisementStatus: formData.advertisementStatus,
      basedOnDecorProjectId: formData.basedOnDecorProject?.id ?? null,
      siteId: params.id,
    };
    console.log(createRequest);

    try {
      const response = await createProject(createRequest);
      console.log(response);
      if (response.data != null) {
        toast.success("Thêm thành công!");
        onSubmit();
        handleClose();
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
                  <Typography variant="h5">
                    Tên
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Typography variant="p">Tên dự án</Typography>
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
                  <Typography variant="h5">
                    Loại dự án
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
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
                  <Typography variant="h5">
                    Trạng thái
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
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
                  <Typography variant="h5">
                    Ngôn ngữ
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
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
                  <Typography variant="h5">
                    Danh mục
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
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

            {/* DESCRIPTION */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Mô tả</Typography>
                  <Typography variant="p">Mô tả sơ lược về dự án</Typography>
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

            {/* BASED ON DECOR PROJECT */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Dựa trên dự án thiết kế</Typography>
                  <Typography variant="p">
                    Chọn dự án thiết kế mà dự án này được dựa trên
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      options={decorProjects}
                      getOptionLabel={(option) => option?.name ?? ""}
                      value={formData.basedOnDecorProject}
                      onChange={(event, value) =>
                        handleInputChange("basedOnDecorProject", value)
                      }
                      noOptionsText="Không tìm thấy"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={formData.basedOnDecorProjectError.hasError}
                          variant="outlined"
                          helperText={formData.basedOnDecorProjectError.label}
                        />
                      )}
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
                    Quảng cáo
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Typography variant="p">
                    Dùng dự án này để quảng cáo trên trang chủ
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={formData.advertisementStatus}
                      onChange={(e) =>
                        handleInputChange("advertisementStatus", e.target.value)
                      }
                    >
                      <MenuItem disabled value={-1}>
                        Chọn một...
                      </MenuItem>
                      {advertisementStatusOptions.map((option, index) => (
                        <MenuItem key={option} value={index}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
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
                  onClick={handleCreate}
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
