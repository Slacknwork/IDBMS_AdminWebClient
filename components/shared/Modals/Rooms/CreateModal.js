"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";

import { getAllRoomTypes } from "/services/roomTypeServices";
import { createRoom } from "/services/roomServices";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import NumberForm from "/components/shared/Forms/Number";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";

export default function CreateRoomModal({ onCreate }) {
  const params = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    floorNo: "",
    floorNoError: { hasError: false, label: "" },
    usePurpose: "",
    usePurposeError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    area: 0,
    areaError: { hasError: false, label: "" },
    roomTypeId: "",
    roomTypeError: { hasError: false, label: "" },
    projectId: params.id,
    floorId: params.floorId ?? "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    handleInputError(field, false, "");
  };
  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const handleCreate = async () => {
    console.log(formData);
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
  }, []);

  return (
    <FormModal
      buttonLabel="Tạo"
      title="Tạo loại phòng"
      submitLabel="Tạo"
      onSubmit={handleCreate}
      size="big"
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
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Mô tả"
          subtitle="Nhập mô tả"
          value={formData.description}
          error={formData.descriptionError.hasError}
          errorLabel={formData.descriptionError.label}
          onChange={(e) => handleInputChange("description", e.target.value)}
        ></TextForm>
      </Grid>

      {/* AREA */}
      <Grid item xs={12} lg={12}>
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

      {/* TYPE OF ROOM SELECTION */}
      <Grid item xs={12} lg={12}>
        <AutocompleteForm
          title="Loại phòng"
          required
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
