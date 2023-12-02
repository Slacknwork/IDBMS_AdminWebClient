"use client";

import { useState } from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import PageContainer from "/components/container/PageContainer";
import DeleteModal from "./deleteModal";
import SaveModal from "./modal";

import calculationUnitOptions from "/constants/enums/calculationUnit";
import projectTaskStatusOptions from "/constants/enums/projectTaskStatus";

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
    id: "",
    name: "",
    nameError: { hasError: false, label: "" },
    stageNo: 0,
    stageNoError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    isPaid: false,
    totalContractPaid: 0,
    totalContractPaidError: { hasError: false, label: "" },
    totalIncurredPaid: 0,
    totalIncurredPaidError: { hasError: false, label: "" },
    isPrepaid: false,
    pricePercentage: 0,
    pricePercentageError: { hasError: false, label: "" },
    paidDate: "",
    startedDate: "",
    endDate: "",
    endTimePayment: "",
    penaltyFee: 0,
    penaltyFeeError: { hasError: false, label: "" },
    estimateBusinessDay: 0,
    estimateBusinessDayError: { hasError: false, label: "" },
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

  const handleNumberChange = (field, value) => {
    const val = parseFloat(value);
    handleInputChange(field, val);
  };
  const handleCheckboxChange = (fieldName, checked) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: !formData[fieldName],
    }));
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
              Giai đoạn thanh toán
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
              {/* STAGE NO */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">
                      Giai đoạn số<span style={{ color: "red" }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        error={formData.stageNoError.hasError}
                        variant="outlined"
                        value={formData.stageNo}
                        helperText={formData.stageNoError.label}
                        onChange={(e) =>
                          handleNumberChange("stageNo", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

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
                        error={formData.nameError.hasError}
                        variant="outlined"
                        value={formData.name}
                        helperText={formData.nameError.label}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
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
                        variant="outlined"
                        value={formData.description}
                        error={formData.descriptionError.hasError}
                        helperText={formData.descriptionError.label}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* IS PAID */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Is Paid</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.isPaid}
                          onChange={(e) =>
                            handleCheckboxChange("isPaid", e.target.checked)
                          }
                        />
                      }
                      label="Check if payment is required"
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* TOTAL CONTRACT PAID */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Total Contract Paid</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        variant="outlined"
                        value={formData.totalContractPaid}
                        error={formData.totalContractPaidError.hasError}
                        helperText={formData.totalContractPaidError.label}
                        onChange={(e) =>
                          handleNumberChange(
                            "totalContractPaid",
                            e.target.value
                          )
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* TOTAL INCURRED PAID */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Total Incurred Paid</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        variant="outlined"
                        value={formData.totalIncurredPaid}
                        error={formData.totalIncurredPaidError.hasError}
                        helperText={formData.totalIncurredPaidError.label}
                        onChange={(e) =>
                          handleNumberChange(
                            "totalIncurredPaid",
                            e.target.value
                          )
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* IS PREPAID */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Is Prepaid</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.isPrepaid}
                          onChange={(e) =>
                            handleCheckboxChange("isPrepaid", e.target.checked)
                          }
                        />
                      }
                      label="Check if payment is prepaid"
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* PRICE PERCENTAGE */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Price Percentage</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        variant="outlined"
                        value={formData.pricePercentage}
                        error={formData.pricePercentageError.hasError}
                        helperText={formData.pricePercentageError.label}
                        onChange={(e) =>
                          handleNumberChange("pricePercentage", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* PAID DATE */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Paid Date</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="date"
                        variant="outlined"
                        value={formData.paidDate}
                        onChange={(e) =>
                          handleInputChange("paidDate", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* STARTED DATE */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Started Date</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="date"
                        variant="outlined"
                        value={formData.startedDate}
                        onChange={(e) =>
                          handleInputChange("startedDate", e.target.value)
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
                    <Typography variant="h5">End Date</Typography>
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

              {/* END TIME PAYMENT */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">End Time Payment</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="datetime-local"
                        variant="outlined"
                        value={formData.endTimePayment}
                        onChange={(e) =>
                          handleInputChange("endTimePayment", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* PENALTY FEE */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Penalty Fee</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        variant="outlined"
                        value={formData.penaltyFee}
                        error={formData.penaltyFeeError.hasError}
                        helperText={formData.penaltyFeeError.label}
                        onChange={(e) =>
                          handleNumberChange("penaltyFee", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* ESTIMATE BUSINESS DAY */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Estimate Business Day</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        variant="outlined"
                        value={formData.estimateBusinessDay}
                        error={formData.estimateBusinessDayError.hasError}
                        helperText={formData.estimateBusinessDayError.label}
                        onChange={(e) =>
                          handleNumberChange(
                            "estimateBusinessDay",
                            e.target.value
                          )
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
