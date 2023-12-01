"use client";

import {
  Box,
  Card,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import PageContainer from "/components/container/PageContainer";
import SaveModal from "./modal";
import DeleteModal from "./deleteModal";

export default function FloorOverview() {
  const [formData, setFormData] = useState({
    floorNo: "",
    floorNoError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    usePurpose: "",
    usePurposeError: { hasError: false, label: "" },
  });

  const validateInput = (field, value) => {
    switch (field) {
      case "floorNo":
        return value.trim() === "" ? "Floor Number cannot be empty" : "";
      case "description":
        return value.trim() === "" ? "Description cannot be empty" : "";
      case "usePurpose":
        return value.trim() === "" ? "Use Purpose cannot be empty" : "";
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

  return (
    <PageContainer title="Floor Details" description="Details of the floor">
      <Box sx={{ overflow: "auto", mt: 3 }}>
        <Grid container columnSpacing={4} rowSpacing={4}>
          <Grid
            item
            xs={12}
            lg={12}
            sx={{
              borderBottom: 1,
              display: "flex",
              justifyContent: "space-between",
              borderColor: "grey.500",
              py: 3,
            }}
          >
            <Typography variant="h2" sx={{ my: "auto" }}>
              Tầng số N
            </Typography>
            <Box sx={{ display: "flex" }}>
              <DeleteModal>Xóa</DeleteModal>
              <SaveModal>Lưu</SaveModal>
            </Box>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Grid container columnSpacing={2} rowSpacing={4}>
              {/* FLOOR NO */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">
                      Tầng số
                      <span style={{ color: "red" }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        variant="outlined"
                        value={formData.floorNo}
                        error={formData.floorNoError.hasError}
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
                      Mục đích
                      <span style={{ color: "red" }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        variant="outlined"
                        value={formData.usePurpose}
                        error={formData.usePurposeError.hasError}
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
                    <Typography variant="h5">
                      Mô tả
                      <span style={{ color: "red" }}>*</span>
                    </Typography>
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
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card
              variant="outlined"
              sx={{ p: 3, border: 1, borderColor: "gray" }}
            >
              <Typography variant="h5" sx={{ my: "auto" }}>
                Bảng giá
              </Typography>
              <Grid
                container
                sx={{ mt: 2, borderTop: 1, borderColor: "gray", pt: 2 }}
              >
                <Grid item xs={6} lg={5}>
                  <Typography variant="h6" sx={{ my: "auto" }}>
                    Phòng 1:
                  </Typography>
                </Grid>
                <Grid item xs={6} lg={7}>
                  <Typography variant="p" sx={{ my: "auto" }}>
                    4.000.000 VND
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
