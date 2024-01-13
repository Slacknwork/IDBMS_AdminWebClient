"use client";

import { useState } from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import { updateProjectParticipation } from "/services/projectParticipationServices";

import participationRoleOptions from "/constants/enums/participationRole";
import { useSelector } from "react-redux";

export default function UpdateParticipationRoleModal({ participant, success }) {
  const params = useParams();
  const data = useSelector((state) => state.data);
  const project = data?.project;

  const [formData, setFormData] = useState({
    role: participant.role,
    roleError: { hasError: false, label: "" },
    projectId: params.id,
    userId: [],
    userIdError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "userId":
        handleUserChange(value);
        console.log(value);
        handleInputError(field, false, "");
        break;
      default:
        handleInputError(field, false, "");
    }
  };

  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const handleUserChange = (newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      userId: newValue,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateProjectParticipation(participant.id, formData);
      toast.success("Cập nhật thành công!");
      typeof success === "function" && success();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const isOptionDisabled = (index) => {
    // cannot update to pj owner / manager
    if (index === 0 || index === 1) return true;

    // all role can be Viewer
    if (index === 4) return false;

    if (project?.type == 0 && index == 3)
      // cannot add cons man to decor pj
      return true;

    if (project?.type == 1 && index == 2)
      // cannot add arc to cons pj
      return true;

    switch (participant?.user?.role) {
      case 1: // architect
        return index !== 2; // Allow participation role 2 - Architect
      case 2: // construction
        return index !== 3; // Allow participation role 3 - Construction Manager
      default:
        return true;
    }
  };

  return (
    <FormModal
      buttonLabel="Cập nhật vai trò"
      title="Cập nhật vai trò trong dự án"
      submitLabel="Cập nhật"
      onSubmit={handleUpdate}
    >
      {/* PARTICIPATION ROLE */}
      <Grid item xs={12} lg={12}>
        <Grid container>
          <Grid item xs={4} lg={4}>
            <Typography variant="h5">
              Vai trò
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <Typography variant="p">Chọn vai trò</Typography>
          </Grid>
          <Grid item xs={8} lg={8}>
            <FormControl fullWidth>
              <Select
                variant="outlined"
                value={formData.role}
                onChange={(e) =>
                  handleInputChange("role", parseInt(e.target.value))
                }
                error={formData.roleError.hasError}
              >
                {participationRoleOptions.map((option, index) => (
                  <MenuItem
                    key={index}
                    value={index}
                    disabled={isOptionDisabled(index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {formData.roleError.hasError && (
                <FormHelperText>{formData.roleError.label}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      {/* USER */}
      <Grid item xs={12} lg={12}>
        <TextForm
          title="Tên người dùng trong hệ thống"
          subtitle="Chọn người dùng"
          value={participant?.user?.name}
          disabled
        ></TextForm>
      </Grid>
    </FormModal>
  );
}
