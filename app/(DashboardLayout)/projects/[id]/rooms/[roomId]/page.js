"use client";

import { useParams } from "next/navigation";
import {
  Box,
  Card,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { getRoomById } from "/api/roomServices";
import { getAllRoomTypes } from "/api/roomTypeServices";

import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";

export default function RoomOverview() {
  const params = useParams();
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
    floorId: "",
    isHidden: "",
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

  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [roomtypes, setRoomTypes] = useState([]);

  const fetchDataFromApi = async () => {
    if (!initialized.current) {
      initialized.current = true;
      try {
        const data = await getRoomById(params.roomId);
        mapData(data);

        const rts = await getAllRoomTypes();
        setRoomTypes(rts.list);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      }
    }
  };

  const mapData = (data) => {
    if (data) {
      // const storedFloorId = localStorage.getItem('floorId');
      // console.log(storedFloorId)

      setFormData((prevFormData) => ({
        ...prevFormData,
        usePurpose: data.usePurpose ?? "Không xác định",
        description: data.description ?? "",
        area: data.area ?? 0,
        pricePerArea: data.pricePerArea ?? 0,
        roomType: data?.roomType?.id ?? "",
        floorId: data?.floorId ?? "",
        isHidden: data?.isHidden ?? "",
      }));

      setTasks(data.tasks ?? []);

      const total = data.tasks?.reduce((acc, task) => {
        const roomTotal = (task.pricePerUnit || 0) * (task.unitInContract || 0);
        return acc + (isNaN(roomTotal) ? 0 : roomTotal);
      }, 0);
      setTotal(total ?? 0);
    }
  };

  const onHiddenRoom = async () => {
    try {
      const response = await updateRoomIsHidden(
        params.roomId,
        isHidden,
        params.id
      );
      toast.success("Cập nhật thành công!");
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const onSaveRoom = async () => {
    try {
      const response = await updateRoom(params.roomId ?? "", formData);
      toast.success("Cập nhật thành công!");
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <PageContainer
      title="Thông tin phòng"
      description="Thông tin chi tiết của phòng"
    >
      <DetailsPage
        title="Thông tin phòng"
        saveMessage="Lưu thông tin phòng?"
        onSave={onSaveRoom}
        hasDelete
        deleteMessage="Ẩn phỏng?"
        onDelete={onHiddenRoom}
      >
        <Grid item xs={12} lg={8}>
          <Grid container columnSpacing={2} rowSpacing={4}>
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

            {/* AREA */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">
                    Diện tích
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
                      InputProps={{ endAdornment: "m²" }}
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
                    Đơn giá / diện tích
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      value={formData.pricePerArea?.toLocaleString("en-US")}
                      error={formData.pricePerAreaError.hasError}
                      helperText={formData.pricePerAreaError.label}
                      disabled
                      onChange={(e) =>
                        handleInputChange("pricePerArea", e.target.value)
                      }
                      InputProps={{
                        style: {
                          backgroundColor: "#EFEFEF",
                        },
                        endAdornment: "VND/m²",
                      }}
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
                    Trạng thái
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      disabled
                      value={formData.isHidden ? "Đang ẩn" : "Đang hoạt động"}
                      InputProps={{
                        style: {
                          backgroundColor: "#EFEFEF",
                        },
                      }}
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
                    Loại phòng
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
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
                      {roomtypes.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
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
            <Typography
              variant="h5"
              sx={{ my: "auto", mt: 1, borderTop: 1, borderColor: "gray" }}
            ></Typography>
            {tasks &&
              tasks.map((task, index) => (
                <Grid container key={index} sx={{ mt: 1, pt: 2 }}>
                  <Grid item xs={6} lg={5}>
                    <Typography variant="h6" sx={{ my: "auto" }}>
                      {task.name ?? ""}:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                    <Typography variant="p" sx={{ my: "auto" }}>
                      {(task.unitInContract * task.pricePerUnit).toLocaleString(
                        "en-US"
                      ) ?? 0}{" "}
                      VND
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            <Grid
              container
              sx={{ mt: 2, borderTop: 1, borderColor: "gray", pt: 2 }}
            >
              <Grid item xs={6} lg={5}>
                <Typography variant="h6" sx={{ my: "auto" }}>
                  Tổng cộng:
                </Typography>
              </Grid>
              <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                <Typography variant="h6" sx={{ my: "auto" }}>
                  {total.toLocaleString("en-US") ?? 0} VND
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </DetailsPage>
    </PageContainer>
  );
}
