"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import languageOptions from "/constants/enums/language";

import { getAllRoomTypes } from "/services/roomTypeServices";
import { createRoom } from "/services/roomServices";

import FormModal from "/components/shared/Modals/Form";
import SelectForm from "/components/shared/Forms/Select";
import TextForm from "/components/shared/Forms/Text";
import NumberForm from "/components/shared/Forms/Number";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";
import checkValidField from "/components/validations/field"

export default function CreateRoomModal({ onCreate }) {
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
    area: 0,
    areaError: { hasError: false, label: "" },
    roomTypeId: null,
    roomTypeError: { hasError: false, label: "" },
    language: 0,
    languageError: { hasError: false, label: "" },
    projectId: params.id,
    floorId: params.floorId ?? "",
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "usePurpose":
      case "area":
      case "language":  
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
      case "floorNo":
      case "description":
      case "roomTypeId":
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
      handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  const handleCreate = async () => {
    if (!switchSubmit) return;
    try {
      const response = await createRoom(formData);
      console.log(response);
      toast.success("Thêm thành công!");
      router.push(`/projects/${params.id}/rooms/${response.id}`);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const [loading, setLoading] = useState(true);
  const [roomtypes, setRoomTypes] = useState([]);

  // FETCH OPTIONS
  const fetchOptionsFromApi = async () => {
    const fetchRoomTypes = async () => {
      try {
        const response = await getAllRoomTypes();
        console.log(response);
        setRoomTypes(response.list || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Loại phòng' từ hệ thống");
      }
    };
    await Promise.all([fetchRoomTypes()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchOptionsFromApi();
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
      title="Tạo loại phòng"
      submitLabel="Tạo"
      onSubmit={handleSubmit}
      size="big"
      disableCloseOnSubmit
    >
      {/* USE PURPOSE */}
      <Grid item xs={12} lg={12}>
        <TextForm
          title="Công dụng"
          required
          subtitle="Nhập mô tả mục đích sử dụng phòng"
          value={formData.usePurpose}
          error={formData.usePurposeError.hasError}
          errorLabel={formData.usePurposeError.label}
          onChange={(e) => handleInputChange("usePurpose", e.target.value)}
        ></TextForm>
      </Grid>

      {/* DESCRIPTION */}
      <Grid item xs={12} lg={12}>
        <TextForm
          multiline
          titleSpan={2}
          fieldSpan={10}
          rows={4}
          title="Mô tả"
          subtitle="Nhập mô tả"
          value={formData.description}
          error={formData.descriptionError.hasError}
          errorLabel={formData.descriptionError.label}
          onChange={(e) => handleInputChange("description", e.target.value)}
        ></TextForm>
      </Grid>

      {/* AREA */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Diện tích"
          required
          subtitle="Nhập ước tính diện tích phòng"
          value={formData.area}
          error={formData.areaError.hasError}
          errorLabel={formData.areaError.label}
          onChange={(value) => handleInputChange("area", value)}
          endAdornment={<>m²</>}
        ></NumberForm>
      </Grid>

      {/* LANGUAGE */}
      <Grid item xs={12} lg={6}>
        <SelectForm
          title="Ngôn ngữ"
          subtitle="Chọn ngôn ngữ"
          value={formData.language}
          options={languageOptions}
          defaultValue={-1}
          defaultLabel="Chọn một..."
          error={formData.languageError.hasError}
          errorLabel={formData.languageError.label}
          onChange={(value) => handleInputChange("language", value)}
        ></SelectForm>
      </Grid>

      {/* TYPE OF ROOM SELECTION */}
      <Grid item xs={12} lg={12}>
        <AutocompleteForm
          title="Loại phòng"
          subtitle="Chọn loại phòng"
          value={formData.roomTypeId}
          options={roomtypes}
          error={formData.roomTypeError.hasError}
          errorLabel={formData.roomTypeError.label}
          onChange={(value) => handleInputChange("roomTypeId", value)}
        ></AutocompleteForm>
      </Grid>
      {/* <MenuItem value={value.id} key={value.id}>
                                        {value.name} - {value.pricePerArea} VND/m² -{" "}
                                        {value.estimateDayPerArea} ngày/m² */}
    </FormModal>
  );
}
