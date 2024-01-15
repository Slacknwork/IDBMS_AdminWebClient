"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Card,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getFloorsById,
  getFloorsByProjectId,
  updateFloor,
  deleteFloorById,
} from "/services/floorServices";

import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";
import checkValidField from "/components/validations/field";

export default function FloorDetailsPage() {
  const params = useParams();
  const router = useRouter();

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
      case "floorNo":
      case "usePurpose":
        const result = checkValidField(value);

        if (result.isValid == false) {
          setFormData((prevData) => ({
            ...prevData,
            [field]: value,
            [`${field}Error`]: {
              hasError: true,
              label: result.label,
            },
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [field]: value,
            [`${field}Error`]: {
              hasError: false,
              label: "",
            },
          }));
        }
        break;
      case "description":
        setFormData((prevData) => ({
          ...prevData,
          [field]: value,
          [`${field}Error`]: {
            hasError: false,
            label: "",
          },
        }));
        break;
      default:
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

  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [total, setTotal] = useState(0);

  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  const fetchFloorDetails = async () => {
    try {
      const projectId = params.id;
      const response = await getFloorsById(params.floorId, projectId);
      mapData(response);
    } catch (error) {
      toast.error("Lỗi nạp dữ liệu 'Tầng' từ hệ thống");
    }
  };

  const fetchFloorList = async () => {
    try {
      const projectId = params.id;
      const floors = await getFloorsByProjectId({
        projectId,
      });
      setFloors(floors.list);
    } catch (error) {
      toast.error("Lỗi nạp dữ liệu 'Danh sách tầng' từ hệ thống");
    }
  };

  const fetchDataFromApi = async () => {
    setLoading(true);
    await Promise.all([fetchFloorList(), fetchFloorDetails()]);
    setLoading(false);
  };

  // FLOOR NO DISPLAY
  const [displayedValue, setDisplayedValue] = useState(0);
  useEffect(() => {
    setDisplayedValue(
      formData.floorNo === 0
        ? "Trệt"
        : formData.floorNo < 0
        ? `B${-formData.floorNo}`
        : formData.floorNo.toString()
    );
  }, [formData]);

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

  const floorExists = (floorNo) => {
    return floors.find((floor) => floorNo === floor.floorNo);
  };

  const handleFloorIncrement = (incrementBy) => {
    let newValue = formData.floorNo + Number(incrementBy);
    while (floorExists(newValue)) {
      newValue++;
    }
    handleInputChange("floorNo", newValue);
  };

  const handleFloorDecrement = (decrementBy) => {
    let newValue = formData.floorNo - Number(decrementBy);
    while (floorExists(newValue)) {
      newValue--;
    }
    handleInputChange("floorNo", newValue);
  };

  const onSaveFloor = async () => {
    try {
      await updateFloor(params.floorId ?? "", formData, params.id);
      toast.success("Cập nhật thành công!");
      await fetchDataFromApi();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const onDeleteFloor = async () => {
    try {
      await deleteFloorById(params.floorId, params.id);
      toast.success("Xóa thành công!");
      router.push(`/projects/${params.id}/floors`);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  useEffect(() => {
    if (!switchSubmit) return;

    const hasErrors = Object.values(formData).some((field) => field?.hasError);
    setFormHasError(hasErrors);

    if (hasErrors) {
      toast.error("Dữ liệu nhập không đúng yêu cầu!");
      setSwitchSubmit(false);
      return;
    }

    onSaveFloor();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <PageContainer
      title="Thông tin tầng"
      description="Thông tin chi tiết về tầng"
    >
      <DetailsPage
        loading={loading}
        title="Thông tin tầng"
        saveMessage="Lưu thông tin tầng?"
        onSave={handleSubmit}
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
