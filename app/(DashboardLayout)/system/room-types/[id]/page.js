"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";
import NumberForm from "/components/shared/Forms/Number";
import NumberSimpleForm from "/components/shared/Forms/NumberSimple";
import FileForm from "/components/shared/Forms/File";

import {
  getRoomTypeById,
  updateRoomType,
  updateRoomTypeHiddenStatus,
} from "/services/roomTypeServices";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function RoomTypeDetails() {
  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    englishName: "",
    englishNameError: { hasError: false, label: "" },
    image: null,
    imageUrl: null,
    imageError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    englishDescription: "",
    englishDescriptionError: { hasError: false, label: "" },
    pricePerArea: 0,
    pricePerAreaError: { hasError: false, label: "" },
    estimateDayPerArea: 0,
    estimateDayPerAreaError: { hasError: false, label: "" },
    isHidden: false,
    isHiddenError: { hasError: false, label: "" },
    iconImage: null,
    iconImageUrl: null,
    iconImageError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: { hasError: false, label: "" },
    }));
    handleInputError(field, false, "");
  };

  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  // INIT CONST
  const [loading, setLoading] = useState(true);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchRoomType = async () => {
      try {
        const response = await getRoomTypeById(params.id);
        console.log(response);
        setFormData((prevData) => ({ ...prevData, ...response }));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Loại Phòng' từ hệ thống");
      }
    };
    await Promise.all([fetchRoomType()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  // HANDLE BUTTON CLICK
  const handleSave = async () => {
    const transformedValue = transformData(formData);
    console.log(transformedValue);

    try {
      const response = await updateRoomType(params.id, transformedValue);
      console.log(response);
      toast.success("Cập nhật thành công!");
      await fetchDataFromApi();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };
  const handleUpdateStatus = async () => {
    try {
      const response = await updateRoomTypeHiddenStatus(
        params.id,
        formData?.isHidden ? false : true
      );
      console.log(response);
      toast.success("Cập nhật thành công!");
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const transformData = (obj) => {
    const result = { ...obj };
    for (const key in result) {
      if (result[key] === null) {
        result[key] = "";
      }
    }

    return result;
  };

  return (
    <PageContainer title={formData?.name} description="Chi tiết loại phòng">
      <DetailsPage
        title="Thông tin loại phòng"
        saveMessage="Lưu thông tin loại phòng?"
        onSave={handleSave}
        deleteMessage={
          formData?.isHidden ? "Hiện loại phòng này?" : "Ẩn loại phòng này?"
        }
        deleteLabel={formData?.isHidden ? "Hiện" : "Ẩn"}
        hasDelete
        onDelete={handleUpdateStatus}
      >
        <Grid item xs={12} lg={12}>
          <Grid container columnSpacing={8} rowSpacing={3}>
            {/* NAME */}
            <Grid item xs={12} lg={6}>
              <TextForm
                title="Tên"
                required
                subtitle="Nhập tên phòng"
                value={formData.name}
                error={formData.nameError.hasError}
                errorLabel={formData.nameError.label}
                onChange={(e) => handleInputChange("name", e.target.value)}
              ></TextForm>
            </Grid>

            {/* ENGLISH NAME */}
            <Grid item xs={12} lg={6}>
              <TextForm
                title="Tên tiếng Anh"
                subtitle="Nhập tên tiếng Anh (nếu có)"
                value={formData.englishName}
                error={formData.englishNameError.hasError}
                errorLabel={formData.englishNameError.label}
                onChange={(e) =>
                  handleInputChange("englishName", e.target.value)
                }
              ></TextForm>
            </Grid>

            {/* DESCRIPTION */}
            <Grid item xs={12} lg={6}>
              <TextForm
                title="Mô tả"
                multiline
                rows={4}
                subtitle="Nhập mô tả cho phòng"
                value={formData.description}
                error={formData.descriptionError.hasError}
                errorLabel={formData.descriptionError.label}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              ></TextForm>
            </Grid>

            {/* ENGLISH DESCRIPTION */}
            <Grid item xs={12} lg={6}>
              <TextForm
                title="Mô tả tiếng Anh"
                multiline
                rows={4}
                subtitle="Nhập mô tả tiếng Anh (nếu có)"
                value={formData.englishDescription}
                error={formData.englishDescriptionError.hasError}
                errorLabel={formData.englishDescriptionError.label}
                onChange={(e) =>
                  handleInputChange("englishDescription", e.target.value)
                }
              ></TextForm>
            </Grid>

            {/* PRICE PER AREA */}
            <Grid item xs={12} lg={6}>
              <NumberForm
                title="Giá trên mỗi diện tích"
                required
                subtitle="Nhập giá trên mỗi diện tích"
                value={formData.pricePerArea}
                error={formData.pricePerAreaError.hasError}
                errorLabel={formData.pricePerAreaError.label}
                onChange={(value) => handleInputChange("pricePerArea", value)}
                endAdornment={<>VND/m²</>}
              ></NumberForm>
            </Grid>

            {/* ESTIMATE DAY PER AREA */}
            <Grid item xs={12} lg={6}>
              <NumberSimpleForm
                title="Số ngày trên diện tích"
                required
                subtitle="Ước tính trên 1 m²"
                value={formData.estimateDayPerArea}
                error={formData.estimateDayPerAreaError.hasError}
                errorLabel={formData.estimateDayPerAreaError.label}
                onChange={(value) =>
                  handleInputChange("estimateDayPerArea", value)
                }
                endAdornment={<>Ngày/m²</>}
              ></NumberSimpleForm>
            </Grid>

            {/* IMAGE */}
            <Grid item xs={12} lg={6}>
              <FileForm
                title="Hình ảnh"
                titleSpan={3}
                fieldSpan={9}
                required
                subtitle="Chọn hình ảnh minh họa"
                value={formData.image}
                imgDisplay={formData.imageUrl}
                error={formData.imageError.hasError}
                errorLabel={formData.imageError.label}
                onChange={(file) => handleInputChange("image", file)}
              ></FileForm>
            </Grid>

            {/* ICON IMAGE */}
            <Grid item xs={12} lg={6}>
              <FileForm
                title="Biểu tượng"
                titleSpan={3}
                fieldSpan={9}
                required
                subtitle="Chọn biểu tượng minh họa"
                value={formData.iconImage}
                imgDisplay={formData.iconImageUrl}
                error={formData.iconImageError.hasError}
                errorLabel={formData.iconImageError.label}
                onChange={(file) => handleInputChange("iconImage", file)}
              ></FileForm>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          {/* Additional details can be added here */}
        </Grid>
      </DetailsPage>
    </PageContainer>
  );
}
