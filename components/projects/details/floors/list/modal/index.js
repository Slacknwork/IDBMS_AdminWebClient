"use client";

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "next/navigation";
import { createFloor } from "../../../../../../api/floorServices";
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

const initialValues = {
  floorNo: "",
  floorNoError: { hasError: false, label: "" },
  usePurpose: "",
  usePurposeError: { hasError: false, label: "" },
  description: "",
  descriptionError: { hasError: false, label: "" },
};

export default function CreateFloorModal({ children }) {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState(initialValues);

  const handleInputChange = (field, value) => {
    const errorLabel = validateInput(field, value);
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: { hasError: !!errorLabel, label: errorLabel },
    }));
  };

  const validateInput = (field, value) => {
    switch (field) {
      case "floorNo":
      case "usePurpose":
      case "description":
      default:
        return "";
    }
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
    const request = {
      description: formData.description ?? "",
      usePurpose: formData.usePurpose ?? "",
      floorNo: formData.floorNo ?? "",
      projectId: params.id ?? ""
    }
    const transformedValue = transformEmptyToNull(request);
    console.log(transformedValue)
    try {
      const response = await createFloor(transformedValue);
      console.log(response);
      toast.success("Thêm thành công!");
      handleClose()

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
              Tạo tầng
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
            {/* FLOOR NO */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">
                    Tầng số<span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      type="number"
                      error={formData.floorNoError.hasError}
                      variant="outlined"
                      value={formData.floorNo}
                      helperText={formData.floorNoError.label}
                      onChange={(e) =>
                        handleInputChange("floorNo", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* USE PURPOSE */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">
                    Công dụng<span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={formData.usePurposeError.hasError}
                      variant="outlined"
                      value={formData.usePurpose}
                      helperText={formData.usePurposeError.label}
                      onChange={(e) =>
                        handleInputChange("usePurpose", e.target.value)
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

            {/* SUBMIT */}
            <Grid item xs={12} lg={12}>
              <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" disableElevation
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
