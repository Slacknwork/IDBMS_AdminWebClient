"use client";

import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import { createFloor } from "/services/floorServices";

export default function CreateFloorModal({ onCreate }) {
  const params = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    floorNo: 0,
    floorNoError: { hasError: false, label: "" },
    usePurpose: "",
    usePurposeError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    projectId: params.id,
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "floorNo":
      case "usePurpose":
        if (
          value === null || value === undefined
          || (typeof value === "string" && value.trim() === "")
          || (typeof value === "number" && value < 0)
        ) {
          setFormData((prevData) => ({
            ...prevData,
            [field]: value,
            [`${field}Error`]: {
              hasError: true,
              label: "Không được để trống!",
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
      default:
    }
  };
  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  const handleCreate = async () => {
    console.log(formData);
    try {
      const response = await createFloor(formData);
      console.log(response);
      toast.success("Thêm thành công!");
      router.push(`/projects/${params.id}/floors/${response.id}`);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  // FLOOR NO DISPLAY
  const [displayedValue, setDisplayedValue] = useState(
    formData.floorNo === 0 ? "Trệt" : formData.floorNo
  );

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
  useEffect(() => {
    if (!switchSubmit) return;

    const hasErrors = Object.values(formData).some((field) => field?.hasError);
    setFormHasError(hasErrors);

    if (hasErrors) {
      toast.error("Dữ liệu nhập không đúng yêu cầu!");
      setSwitchSubmit(false);
      return;
    }

    handleCreate();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  return (
    <FormModal
      buttonLabel="Tạo"
      title="Tạo loại phòng"
      submitLabel="Tạo"
      onSubmit={handleSubmit}
      size="big"
      disableCloseOnSubmit={formHasError}
    >
      {/* FLOOR NO */}
      <Grid item xs={12} lg={12}>
        <Grid container spacing={2}>
          <Grid item xs={4} lg={4}>
            <Typography variant="h5">
              Tầng <span style={{ color: "red" }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={8} lg={8}>
            <FormControl fullWidth>
              <Grid container spacing={1} alignItems="center">
                <Grid item style={{ alignSelf: "center" }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleFloorDecrement(10)}
                  >
                    -10
                  </Button>
                </Grid>
                <Grid item style={{ alignSelf: "center" }}>
                  <Button
                    variant="outlined"
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
                    variant="outlined"
                    onClick={() => handleFloorIncrement(1)}
                  >
                    +1
                  </Button>
                </Grid>
                <Grid item style={{ alignSelf: "center" }}>
                  <Button
                    variant="outlined"
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
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Công dụng"
          required
          subtitle="Nhập mục đích sử dụng"
          value={formData.usePurpose}
          error={formData.usePurposeError.hasError}
          errorLabel={formData.usePurposeError.label}
          onChange={(e) => handleInputChange("usePurpose", e.target.value)}
        ></TextForm>
      </Grid>

      {/* DESCRIPTION */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Mô tả"
          subtitle="Nhập mô tả"
          value={formData.description}
          error={formData.descriptionError.hasError}
          helperText={formData.descriptionError.label}
          onChange={(e) => handleInputChange("description", e.target.value)}
        ></TextForm>
      </Grid>
    </FormModal>
  );
}
