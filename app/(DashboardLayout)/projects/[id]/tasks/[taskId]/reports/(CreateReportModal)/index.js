"use client";

import { useState } from "react";
import { FormControl, Grid, TextField, Typography } from "@mui/material";

import calculationUnitOptions from "/constants/enums/calculationUnit";
import { useParams, useRouter } from "next/navigation";
import { createTaskReport } from "/api/taskReportServices";
import { toast } from "react-toastify";

import FormModal from "/components/shared/Modals/Form";

export default function CreateReportModal({ children }) {
  const params = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    calculationUnit: "",
    calculationUnitError: { hasError: false, label: "" },
    unitUsed: 0,
    unitUsedError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
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
    console.log(params);
    const request = {
      name: formData?.name ?? null,
      // calculationUnit: formData?.calculationUnit ?? null,
      unitUsed:
        formData?.unitUsed !== undefined
          ? parseInt(formData.unitUsed, 10)
          : null,
      description: formData?.description ?? null,
      projectTaskId: params.taskId ?? null,
    };
    const transformedValue = transformEmptyToNull(request);
    console.log(transformedValue);
    try {
      const response = await createTaskReport(transformedValue);
      console.log(response);
      toast.success("Thêm thành công!");
      handleClose();
      router.push(
        `/projects/${params.id}/tasks/${params.taskId}/reports/${response.data.id}`
      );
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  return (
    <FormModal
      buttonLabel="Tạo"
      title="Tạo báo cáo"
      submitLabel="Tạo"
      onSubmit={handleCreate}
      size="big"
    >
      <Grid item xs={12} lg={6}>
        <Grid container spacing={4}>
          {/* NAME */}
          <Grid item xs={12} lg={12}>
            <Grid container spacing={2}>
              <Grid item xs={4} lg={4}>
                <Typography variant="h5">Tên báo cáo</Typography>
              </Grid>
              <Grid item xs={8} lg={8}>
                <FormControl fullWidth>
                  <TextField
                    error={formData.nameError.hasError}
                    variant="outlined"
                    value={formData.name}
                    helperText={formData.nameError.label}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {/* UNIT USED */}
          <Grid item xs={12} lg={12}>
            <Grid container spacing={2}>
              <Grid item xs={4} lg={4}>
                <Typography variant="h5">Đã thực hiện</Typography>
                <Typography variant="p">
                  Khối lượng đã thực hiện (theo số đơn vị)
                </Typography>
              </Grid>
              <Grid item xs={8} lg={8}>
                <FormControl fullWidth>
                  <TextField
                    error={formData.unitUsedError.hasError}
                    variant="outlined"
                    type="number"
                    value={formData.unitUsed}
                    helperText={formData.unitUsedError.label}
                    onChange={(e) =>
                      handleInputChange("unitUsed", e.target.value)
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
                    error={formData.descriptionError.hasError}
                    variant="outlined"
                    value={formData.description}
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
    </FormModal>
  );
}
