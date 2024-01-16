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
import { useParams, useRouter, useSearchParams } from "next/navigation";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import { createFloor } from "/services/floorServices";
import checkValidField from "/components/validations/field";

export default function CreateFloorModal({ floorList }) {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const modalOpenQuery = "create";

  const [formData, setFormData] = useState({
    floorNo: 0,
    floorNoError: { hasError: false, label: "" },
    usePurpose: "",
    usePurposeError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    projectId: params.id,
  });

  useEffect(() => {
    const floorMax = floorList?.reduce(
      (max, floor) => (floor.floorNo > max ? floor.floorNo : max),
      -1
    );
    console.log(floorMax);
    handleInputChange("floorNo", floorMax + 1);
  }, [floorList]);

  const handleInputChange = (field, value) => {
    let result = { isValid: true, label: "" }

    switch (field) {
      
      case "usePurpose":
        result = checkValidField({
          value: value,
          maxLength: 750,
          required: true
        });

        break;
      case "description":
        result = checkValidField({
          value: value,
          maxLength: 750,
        });

        break;
      default:
    }
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: {
        hasError: !result.isValid,
        label: result.label,
      },
    }));
  };
  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };
  const [openModal, setOpenModal] = useState(
    searchParams.get(modalOpenQuery) ?? false
  );
  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      !field.endsWith("Error") && handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  const handleCreate = async () => {
    if (!switchSubmit) return;
    try {
      const response = await createFloor(formData, params.id);
      toast.success("Thêm thành công!");
      router.push(`/projects/${params.id}/floors/${response.id}`);
    } catch (error) {
      toast.error("Lỗi!");
    }
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

  const floorExists = (floorNo) => {
    return floorList.find((floor) => floorNo === floor.floorNo);
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

  useEffect(() => {
    if (!switchSubmit) return;

    const hasErrors = Object.values(formData).some((field) => field?.hasError);
    setFormHasError(hasErrors);

    if (hasErrors) {
      toast.error("Dữ liệu nhập không đúng yêu cầu!");
      setSwitchSubmit(false);
      return;
    }

    setOpenModal(false);
    handleCreate();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  return (
    <FormModal
      isOpen={openModal}
      setOpenModal={setOpenModal}
      buttonLabel="Tạo"
      title="Tạo tầng"
      submitLabel="Tạo"
      onSubmit={handleSubmit}
      disableCloseOnSubmit
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
                    variant="contained"
                    disableElevation
                    color="error"
                    onClick={() => handleFloorDecrement(10)}
                  >
                    -10
                  </Button>
                </Grid>
                <Grid item style={{ alignSelf: "center" }}>
                  <Button
                    variant="contained"
                    disableElevation
                    color="error"
                    onClick={() => handleFloorDecrement(1)}
                  >
                    -1
                  </Button>
                </Grid>
                <Grid item xs={2.7} lg={2.5}>
                  <TextField
                    error={formData.floorNoError.hasError}
                    value={displayedValue}
                    helperText={formData.floorNoError.label}
                    onChange={(e) => setDisplayedValue(e.target.value)}
                    disabled
                    sx={{ textAlign: "center", width: "100%" }}
                  />
                </Grid>
                <Grid item style={{ alignSelf: "center" }}>
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={() => handleFloorIncrement(1)}
                  >
                    +1
                  </Button>
                </Grid>
                <Grid item style={{ alignSelf: "center" }}>
                  <Button
                    variant="contained"
                    disableElevation
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
      <Grid item xs={12} lg={12}>
        <TextForm
          title="Mô tả"
          multiline
          rows={4}
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
