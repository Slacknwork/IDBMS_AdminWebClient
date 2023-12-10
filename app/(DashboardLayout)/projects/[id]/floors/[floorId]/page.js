"use client";

import { useParams, useSearchParams } from "next/navigation";
import {
  Button,
  Card,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import {
  getFloorsById,
  updateFloor,
  deleteFloorById,
} from "/api/floorServices";

import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";

export default function FloorDetailsPage() {
  const params = useParams();

  const [formData, setFormData] = useState({
    floorNo: 0,
    floorNoError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    usePurpose: "",
    usePurposeError: { hasError: false, label: "" },
    projectId: params.id,
  });

  const validateInput = (field, value) => {
    switch (field) {
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

  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);
  const [rooms, setRooms] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchDataFromApi = async () => {
    if (!initialized.current) {
      initialized.current = true;
      try {
        const data = await getFloorsById(params.floorId);
        console.log(data);
        mapData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      }
    }
  };
  const [displayedValue, setDisplayedValue] = useState("");

  const mapData = (data) => {
    if (data) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        floorNo: data.floorNo ?? "Không xác định",
        description: data.description ?? "",
        usePurpose: data.usePurpose ?? "Không xác định",
      }));
      setDisplayedValue(
        data?.floorNo === 0 ? "Trệt" : data?.floorNo ?? "Không xác định"
      );
      setRooms(data.rooms ?? "");
      // setTotal
      const total = data.rooms?.reduce((acc, room) => {
        const totalArea = room.area || 0;
        return acc + totalArea;
      }, 0);
      setTotal(total ?? 0);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const handleFloorIncrement = (incrementBy) => {
    const newValue = formData.floorNo + incrementBy;
    handleInputChange("floorNo", newValue);
    setDisplayedValue(newValue);
  };

  const handleFloorDecrement = (decrementBy) => {
    if (formData.floorNo > 0) {
      const newValue = Math.max(0, formData.floorNo - decrementBy);
      if (newValue === 0) {
        handleInputChange("floorNo", newValue);
        setDisplayedValue("Trệt");
      } else {
        handleInputChange("floorNo", newValue.toString());
        setDisplayedValue(newValue.toString());
      }
    }
  };

  const onSaveFloor = async () => {
    try {
      const response = await updateFloor(params.floorId ?? "", formData);
      toast.success("Cập nhật thành công!");
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const onDeleteFloor = async () => {
    try {
      const response = await deleteFloorById(params.floorId);
      toast.success("Xóa thành công!");
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  return (
    <PageContainer
      title="Thông tin tầng"
      description="Thông tin chi tiết về tầng"
    >
      <DetailsPage
        title="Thông tin tầng"
        saveMessage="Lưu thông tin tầng?"
        onSave={onSaveFloor}
        hasDelete
        onDelete={onDeleteFloor}
      >
        <Grid item xs={12} lg={8}>
          <Grid container columnSpacing={2} rowSpacing={4}>
            {/* FLOOR NO */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={3} lg={3}>
                  <Typography variant="h5">
                    Tầng
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={9} lg={9}>
                  <FormControl fullWidth>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item style={{ alignSelf: "center" }}>
                        <Button
                          color="error"
                          disableElevation
                          variant="contained"
                          onClick={() => handleFloorDecrement(10)}
                        >
                          -10
                        </Button>
                      </Grid>
                      <Grid item style={{ alignSelf: "center" }}>
                        <Button
                          color="error"
                          disableElevation
                          variant="contained"
                          onClick={() => handleFloorDecrement(1)}
                        >
                          -1
                        </Button>
                      </Grid>
                      <Grid item xs={2.7} lg={2.5}>
                        <TextField
                          error={formData.floorNoError.hasError}
                          variant="outlined"
                          value={displayedValue}
                          helperText={formData.floorNoError.label}
                          onChange={(e) => setDisplayedValue(e.target.value)}
                          disabled
                          sx={{ textAlign: "center", width: "100%" }}
                        />
                      </Grid>
                      <Grid item style={{ alignSelf: "center" }}>
                        <Button
                          disableElevation
                          variant="contained"
                          onClick={() => handleFloorIncrement(1)}
                        >
                          +1
                        </Button>
                      </Grid>
                      <Grid item style={{ alignSelf: "center" }}>
                        <Button
                          disableElevation
                          variant="contained"
                          onClick={() => handleFloorIncrement(10)}
                        >
                          +10
                        </Button>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* USE PURPOSE */}
            <Grid item xs={12} lg={12}>
              <TextForm
                title="Mục đích"
                required
                titleSpan={3}
                fieldSpan={9}
                subtitle="Mô đích sử dụng của tầng"
                value={formData.usePurpose}
                error={formData.usePurposeError.hasError}
                errorLabel={formData.usePurposeError.label}
                onChange={(e) =>
                  handleInputChange("usePurpose", e.target.value)
                }
              ></TextForm>
            </Grid>

            {/* DESCRIPTION */}
            <Grid item xs={12} lg={12}>
              <TextForm
                title="Mô tả"
                multiline
                rows={4}
                titleSpan={3}
                fieldSpan={9}
                subtitle="Mô tả tầng"
                value={formData.description}
                error={formData.descriptionError.hasError}
                errorLabel={formData.descriptionError.label}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              ></TextForm>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card
            variant="outlined"
            sx={{ p: 3, border: 1, borderColor: "gray" }}
          >
            <Typography variant="h5" sx={{ my: "auto" }}>
              Thống kê các phòng trong tầng
            </Typography>
            <Typography
              variant="h5"
              sx={{ my: "auto", mt: 1, borderTop: 1, borderColor: "gray" }}
            ></Typography>
            {rooms &&
              rooms.map((room, index) => (
                <Grid container key={index} sx={{ mt: 1, pt: 2 }}>
                  <Grid item xs={6} lg={5}>
                    <Typography variant="h6" sx={{ my: "auto" }}>
                      {room.usePurpose ?? ""}:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                    <Typography variant="p" sx={{ my: "auto" }}>
                      {room.area ?? 0} m²
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
                  {total.toLocaleString("en-US") ?? 0} m²
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </DetailsPage>
    </PageContainer>
  );
}
