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
import NumberSimpleForm from "/components/shared/Forms/NumberSimple";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";
import checkValidField from "/components/validations/field";
import { useSelector } from "react-redux";
import { projectTypeIndex } from "/constants/enums/projectType";

export default function CreateRoomModal({ onCreate }) {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = useSelector((state) => state.data);
  const project = data?.project;

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
    language: project?.language,
    languageError: { hasError: false, label: "" },
    projectId: params.id,
    floorId: params.floorId ?? "",
  });

  const handleInputChange = (field, value) => {
    let result = { isValid: true, label: "" };
    switch (field) {
      case "usePurpose":
        result = checkValidField({
          value: value,
          maxLength: 750,
          required: true,
        });

        break;
      case "area":
        result = checkValidField({
          value: value,
          minValue: 0,
          checkZeroValue: true,
          required: true,
        });

        break;
      case "description":
        result = checkValidField({
          value: value,
          maxLength: 750,
        });

        break;
      case "roomTypeId":
        result = checkValidField({
          value: value,
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
      const response = await createRoom(formData, params.id);
      toast.success("Thêm thành công!");
      router.push(`/projects/${params.id}/rooms/${response.id}`);
    } catch (error) {
      toast.error("Lỗi!");
    }
  };

  const [loading, setLoading] = useState(true);
  const [roomtypes, setRoomTypes] = useState([]);

  // FETCH OPTIONS
  const fetchOptionsFromApi = async () => {
    setLoading(true);
    const fetchRoomTypes = async () => {
      try {
        const response = await getAllRoomTypes();
        setRoomTypes(response.list || []);
      } catch (error) {
        toast.error("Lỗi nạp dữ liệu 'Loại phòng' từ hệ thống");
      }
    };
    await Promise.all([fetchRoomTypes()]);
    setLoading(false);
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

  useEffect(() => {
    fetchOptionsFromApi();
  }, []);

  return (
    <FormModal
      isOpen={openModal}
      setOpenModal={setOpenModal}
      buttonLabel="Tạo"
      title="Tạo phòng"
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
          titleSpan={3}
          fieldSpan={9}
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
          titleSpan={3}
          fieldSpan={9}
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
        <NumberSimpleForm
          title="Diện tích"
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          required
          subtitle="Nhập diện tích phòng"
          value={formData.area}
          error={formData.areaError.hasError}
          errorLabel={formData.areaError.label}
          onChange={(value) => handleInputChange("area", value)}
          endAdornment={<>m²</>}
        ></NumberSimpleForm>
      </Grid>

      {/* TYPE OF ROOM SELECTION */}
      {project?.type === projectTypeIndex.Decor && (
        <Grid item xs={12} lg={6}>
          <AutocompleteForm
            title="Loại phòng"
            titleSpan={3}
            fieldSpan={9}
            subtitle="Chọn loại phòng"
            value={formData.roomTypeId}
            options={roomtypes}
            error={formData.roomTypeError.hasError}
            errorLabel={formData.roomTypeError.label}
            onChange={(value) => handleInputChange("roomTypeId", value)}
          ></AutocompleteForm>
        </Grid>
      )}

      {/* <MenuItem value={value.id} key={value.id}>
                                        {value.name} - {value.pricePerArea} VND/m² -{" "}
                                        {value.estimateDayPerArea} ngày/m² */}
    </FormModal>
  );
}
