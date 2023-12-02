"use client";

import { useState } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";

import PageContainer from "/components/container/PageContainer";
import DeleteModal from "./deleteModal";
import SaveModal from "./modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  overflowY: "auto",
  boxShadow: 24,
};

export default function StageOverview() {
  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    reason: "",
    reasonError: { hasError: false, label: "" },
    solution: "",
    solutionError: { hasError: false, label: "" },
    note: "",
    noteError: { hasError: false, label: "" },
    totalPaid: 0,
    totalPaidError: { hasError: false, label: "" },
    isCompanyCover: false,
    endDate: null,
    confirmationDocument: null,
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: { hasError: false, label: "" },
    }));
  };

  const handleNumberChange = (field, value) => {
    const val = parseFloat(value);
    handleInputChange(field, val);
  };

  const handleCheckboxChange = (field, checked) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: checked,
    }));
  };

  const handleFileInputChange = (file) => {
    handleInputChange("confirmationDocument", file);
  };

  return (
    <PageContainer title="Task Details" description="Details of the task">
      <Box sx={{ overflow: "auto", mt: 3 }}>
        <Grid container columnSpacing={4} rowSpacing={4}>
          <Grid
            item
            xs={12}
            lg={12}
            sx={{
              borderBottom: 1,
              display: "flex",
              justifyContent: "space-between",
              borderColor: "grey.500",
              py: 3,
            }}
          >
            <Typography variant="h2" sx={{ my: "auto" }}>
              Bảo hiểm
            </Typography>
            <Box sx={{ display: "flex" }}>
              <DeleteModal>
                <span>Xóa</span>
              </DeleteModal>
              <SaveModal>
                <span>Lưu</span>
              </SaveModal>
            </Box>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Grid container columnSpacing={2} rowSpacing={4}>
              {/* NAME */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">
                      Tên<span style={{ color: "red" }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        variant="outlined"
                        value={formData.name}
                        error={formData.nameError.hasError}
                        helperText={formData.nameError.label}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* REASON */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Lý Do</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        variant="outlined"
                        value={formData.reason}
                        onChange={(e) =>
                          handleInputChange("reason", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* SOLUTION */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Giải Pháp</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        variant="outlined"
                        value={formData.solution}
                        onChange={(e) =>
                          handleInputChange("solution", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* NOTE */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Ghi Chú</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        multiline
                        rows={4}
                        variant="outlined"
                        value={formData.note}
                        onChange={(e) =>
                          handleInputChange("note", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* TOTAL PAID */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">
                      Tổng Số Tiền (VND)<span style={{ color: "red" }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        variant="outlined"
                        value={formData.totalPaid}
                        error={formData.totalPaidError.hasError}
                        helperText={formData.totalPaidError.label}
                        onChange={(e) =>
                          handleNumberChange("totalPaid", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* IS COMPANY COVER */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Bảo Hiểm Công Ty</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl>
                      <Checkbox
                        checked={formData.isCompanyCover}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "isCompanyCover",
                            e.target.checked
                          )
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* END DATE */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Ngày Kết Thúc</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="date"
                        variant="outlined"
                        value={formData.endDate}
                        onChange={(e) =>
                          handleInputChange("endDate", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* CONFIRMATION DOCUMENT */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Tài Liệu Xác Nhận</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <Input
                        type="file"
                        onChange={(e) =>
                          handleFileInputChange(e.target.files[0])
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            {/* Additional details can be added here */}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
