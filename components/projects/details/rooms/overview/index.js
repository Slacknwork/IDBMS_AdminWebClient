"use client";

import {
  Box,
  Card,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import PageContainer from "/components/container/PageContainer";
import SaveModal from "./modal";
import DeleteModal from "./deleteModal";

const roomTypeOptions = [
  { id: 1, name: "Single Room" },
  { id: 2, name: "Double Room" },
  { id: 3, name: "Suite" },
];

export default function RoomOverview() {
  const [formData, setFormData] = useState({
    usePurpose: "",
    usePurposeError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    area: 0,
    areaError: { hasError: false, label: "" },
    pricePerArea: 0,
    pricePerAreaError: { hasError: false, label: "" },
    roomType: "",
    roomTypeError: { hasError: false, label: "" },
  });

  const validateInput = (field, value) => {
    switch (field) {
      case "usePurpose":
        return value.trim() === "" ? "Use Purpose cannot be empty" : "";
      case "description":
        return value.trim() === "" ? "Description cannot be empty" : "";
      case "area":
      case "pricePerArea":
      case "roomType":
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
    <PageContainer title="Room Details" description="Details of the room">
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
              Room Details
            </Typography>
            <Box sx={{ display: "flex" }}>
              <DeleteModal>Xóa</DeleteModal>
              <SaveModal>Lưu</SaveModal>
            </Box>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Grid container columnSpacing={2} rowSpacing={4}>
              {/* USE PURPOSE */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">
                      Use Purpose
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
                      Description
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

              {/* AREA */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">
                      Area
                      <span style={{ color: "red" }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        variant="outlined"
                        value={formData.area}
                        error={formData.areaError.hasError}
                        helperText={formData.areaError.label}
                        onChange={(e) =>
                          handleInputChange("area", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* PRICE PER AREA */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">
                      Price per Area
                      <span style={{ color: "red" }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        variant="outlined"
                        value={formData.pricePerArea}
                        error={formData.pricePerAreaError.hasError}
                        helperText={formData.pricePerAreaError.label}
                        onChange={(e) =>
                          handleInputChange("pricePerArea", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* ROOM TYPE */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">
                      Room Type
                      <span style={{ color: "red" }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      {/* Assuming roomTypeOptions is an array of objects with id and name */}
                      <TextField
                        select
                        variant="outlined"
                        value={formData.roomType}
                        error={formData.roomTypeError.hasError}
                        helperText={formData.roomTypeError.label}
                        onChange={(e) =>
                          handleInputChange("roomType", e.target.value)
                        }
                      >
                        {roomTypeOptions.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
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
                    Task 1:
                  </Typography>
                </Grid>
                <Grid item xs={6} lg={7}>
                  <Typography variant="p" sx={{ my: "auto" }}>
                    200.000 VND
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
