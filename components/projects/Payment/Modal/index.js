"use client";

import {
  Autocomplete,
  Modal,
  Box,
  Grid,
  Typography,
  FormControl,
  TextField,
  InputLabel,
  Select,
  Button,
  MenuItem,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import participationRole from "../../../../constants/enums/participationRole";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getUser } from "../../../../api/userServices";
import { createParticipation } from "../../../../api/projectParticipationServices";
import CloseIcon from '@mui/icons-material/Close';
import { createPaymentStage } from "../../../../api/paymentStageServices";
// import { DatePicker } from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  p: 4,
};

export default function PaymentStageModal({ open, onClose }) {

  const [value, setValue] = useState({
    stageNo: 1,
    name: "",
    description: "",
    isPaid: false,
    totalContractPaid: 0,
    totalIncurringPaid: "",
    isPrepaid: false,
    pricePercentage: 0,
    paidDate: "",
    startedDate: "",
    endDate: "",
    endTimePayment: "",
    penaltyFee: 0,
    estimateBusinessDay: 0,
    projectId: "FF090F51-E6E7-4854-8F3F-0402EE32C9F8",
    isHidden: true
  });

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const transformEmptyToNull = (obj) => {
    const result = { ...obj };
    for (const key in result) {
      if (result[key] === "" || result[key] === 0) {
        result[key] = null;
      }
    }
    return result;
  };

  const handleAddPaymentStage = async () => {
    const transformedValue = transformEmptyToNull(value);
    console.log(transformedValue)
    try {
      const response = await createPaymentStage(transformedValue);
      console.log(response);
      if (response.data != null) {
        toast.success("Thêm thành công!");
      } else {
        throw new Error("Create failed!");
      }
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };


  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" marginBottom={5}>
          Thêm giai đoạn
        </Typography>
        <IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              label="Tên giai đoạn"
              variant="outlined"
              name="name"
              value={value.name}
              onBlur={changeHandler}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              label="Mô tả"
              variant="outlined"
              name="description"
              value={value.description}
              onBlur={changeHandler}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              label="Số tiền phải trả theo hợp đồng"
              variant="outlined"
              name="totalContractPaid"
              value={value.totalContractPaid}
              type="number"
              inputProps={{ min: 0 }}
              onBlur={changeHandler}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              label="Ước tính % trên tổng giá"
              variant="outlined"
              name="pricePercentage"
              value={value.pricePercentage}
              type="number"
              inputProps={{ min: 0 }}
              onBlur={changeHandler}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              label="Ước tính số ngày để hoàn thành"
              variant="outlined"
              name="estimateBusinessDay"
              type="number"
              inputProps={{ min: 0 }}
              value={value.estimateBusinessDay}
              onBlur={changeHandler}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Tiền phạt trễ hạn thanh toán"
              name="penaltyFee"
              type="number"
              inputProps={{ min: 0 }}
              value={value.penaltyFee}
              onBlur={changeHandler}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography component="h2">
              Ngày bắt đầu
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="startedDate"
              type="date"
              value={value.startedDate}
              onBlur={changeHandler}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography component="h2">
              Ngày kết thúc
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="endDate"
              type="date"
              value={value.endDate}
              onBlur={changeHandler}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography component="h2">
              Ngày hết hạn trả tiền
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="endTimePayment"
              type="date"
              value={value.endTimePayment}
              onBlur={changeHandler}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12} lg={6} container alignItems="center" justifyContent="center">
            <FormControlLabel
              label="Ẩn giai đoạn"
              control={
                <Checkbox
                  checked={value.isHidden}
                  onChange={(e) => changeHandler({ target: { name: "isHidden", value: e.target.checked } })}
                />
              }
            />
          </Grid>
          <Grid item xs={12} lg={9}></Grid>
          <Grid item xs={12} lg={3}>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              fullWidth
              onClick={handleAddPaymentStage}
            >
              Thêm
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal >
  );
}
