"use client";

import { useEffect, useRef, useState } from "react";
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
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getAllRoomTypes } from "/api/roomTypeServices";
import { createRoom } from "/api/roomServices";

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
  area: 0,
  areaError: { hasError: false, label: "" },
  roomType: "",
  roomTypeError: { hasError: false, label: "" },
};

export default function CreateFloorModal({ children, floorNo }) {
  const params = useParams();
  const router = useRouter();
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
      floorId: params.floorId ?? "",
      area: parseInt(formData.area, 10) ?? 0,
      roomTypeId: formData.roomType ?? "",
      projectId: params.id ?? "",
    };
    const transformedValue = transformEmptyToNull(request);
    console.log(transformedValue);
    try {
      const response = await createRoom(transformedValue);
      console.log(response);
      toast.success("Thêm thành công!");
      handleClose();
      router.push(`/projects/${params.id}/rooms/${response.data.id}`);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);
  const [roomtypes, setRoomTypes] = useState([]);

  const fetchDataFromApi = async () => {
    if (!initialized.current) {
      initialized.current = true;
      try {
        const data = await getAllRoomTypes();
        setRoomTypes(data.list);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      }
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

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
              Tạo phòng
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
            {/* <Grid item xs={12} lg={12}>
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
                      disabled
                      onChange={(e) =>
                        handleInputChange("floorNo", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid> */}

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

            {/* AREA */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">
                    Diện tích<span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      type="number"
                      error={formData.areaError.hasError}
                      variant="outlined"
                      value={formData.area}
                      helperText={formData.areaError.label}
                      onChange={(e) =>
                        handleInputChange("area", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* TYPE OF ROOM SELECTION */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">
                    Loại phòng<span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      error={formData.roomTypeError.hasError}
                      variant="outlined"
                      value={formData.roomType}
                      onChange={(e) =>
                        handleInputChange("roomType", e.target.value)
                      }
                    >
                      {roomtypes?.map((value, index) => (
                        <MenuItem value={value.id} key={value.id}>
                          {value.name} - {value.pricePerArea} VND/m² -{" "}
                          {value.estimateDayPerArea} ngày/m²
                        </MenuItem>
                      ))}
                    </Select>

                    {formData.roomTypeError.label}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* SUBMIT */}
            <Grid item xs={12} lg={12}>
              <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
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
