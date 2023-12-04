"use client";

import { useState } from "react";
import {
  Box,
  Button,
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

import calculationUnitOptions from "/constants/enums/calculationUnit";
import { useParams, useRouter } from "next/navigation";
import { createTaskReport } from "../../../../../../../../api/taskReportServices";
import { toast } from "react-toastify";

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

const nameLabel = "Tên công việc";
const nameSubLabel = "Tên của công việc";

const calculationUnitLabel = "Đơn vị tính";

const unitUsedLabel = "Số đơn vị đã sử dụng";
const unitUsedSubLabel = "Số đơn vị đã sử dụng sublabel";

const descriptionLabel = "Mô tả";

export default function SiteModal({ children }) {
  const params = useParams();
  const router = useRouter();
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
    calculationUnit: "",
    calculationUnitError: { hasError: false, label: "" },
    unitUsed: 0,
    unitUsedError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const transformEmptyToNull = (obj) => {
    const result = { ...obj };
    for (const key in result) {
      if (result[key] === "") {
        result[key] = null;
      }
    }
    return result;
  };

  const handleCreate = async () => {
    console.log(params)
    const request = {
      name: formData?.name ?? null,
      // calculationUnit: formData?.calculationUnit ?? null,
      unitUsed: formData?.unitUsed !== undefined
        ? parseInt(formData.unitUsed, 10)
        : null,
      description: formData?.description ?? null,
      projectTaskId: params.taskId ?? null,
    };
    const transformedValue = transformEmptyToNull(request);
    console.log(transformedValue)
    try {
      const response = await createTaskReport(transformedValue);
      console.log(response);
      toast.success("Thêm thành công!");
      handleClose()
      router.push(`/projects/${params.id}/tasks/${params.taskId}/reports/${response.data.id}`);

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
        <Box sx={{ ...style }} component="div">
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
              Tạo báo cáo mới
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
                  <Typography variant="h5">Tên báo cáo</Typography>
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

            {/* CALCULATION UNIT */}
            {/* <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Đơn vị</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={formData.calculationUnit}
                      onChange={(e) =>
                        handleInputChange("calculationUnit", e.target.value)
                      }
                      error={formData.calculationUnitError.hasError}
                    >
                      <MenuItem disabled value={-1}>
                        Chọn đơn vị
                      </MenuItem>
                      {calculationUnitOptions.map((unit, index) => (
                        <MenuItem key={unit} value={index}>
                          {unit}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid> */}

            {/* UNIT USED */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Đã thực hiện</Typography>
                  <Typography variant="p">
                    Khối lượng đã thực hiện (theo số đơn vị)
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={formData.unitUsedError.hasError}
                      variant="outlined"
                      type="number"
                      value={formData.unitUsed}
                      helperText={formData.unitUsedError.label}
                      onChange={(e) =>
                        handleInputChange("unitUsed", e.target.value)
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
                  <Typography variant="h5">{descriptionLabel}</Typography>
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
