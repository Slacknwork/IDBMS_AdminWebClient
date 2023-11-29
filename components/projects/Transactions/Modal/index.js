"use client";

import {
  Modal,
  Box,
  Grid,
  Typography,
  FormControl,
  TextField,
  Select,
  Button,
  MenuItem,
} from "@mui/material";

import transactionStatus from "/constants/enums/transactionStatus";
import transactionType from "/constants/enums/transactionType";
import { useState, useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  p: 4,
};

export default function TransactionModal({ modalTransaction, open, onClose }) {
  const [type, setType] = useState(modalTransaction?.type || 0);
  const onTypeChange = (e) => {
    setType(Number(e.target.value));
  };
  const [status, setStatus] = useState(modalTransaction?.status || 0);
  const onStatusChange = (e) => {
    setStatus(Number(e.target.value));
  };
  const [amount, setAmount] = useState(modalTransaction?.amount || 0);
  const onAmountChange = (e) => {
    setAmount(Number(e.target.value));
  };
  const [note, setNote] = useState(modalTransaction?.note || "");
  const onNoteChange = (e) => {
    setNote(Number(e.target.value));
  };

  useEffect(() => {
    setType(modalTransaction?.type);
    setStatus(modalTransaction?.status);
    setAmount(modalTransaction?.amount);
    setNote(modalTransaction?.note);
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Giao dịch mới
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} lg={6}>
            <Select label="Type" value={type} onChange={onTypeChange} fullWidth>
              {transactionType.map((type, index) => (
                <MenuItem key={type} value={index}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Select
              label="Trạng thái"
              value={status}
              onChange={onStatusChange}
              fullWidth
            >
              {transactionStatus.map((status, index) => (
                <MenuItem key={status} value={index}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} lg={12}>
            <FormControl fullWidth>
              <TextField
                label="Số tiền"
                value={amount}
                onChange={onAmountChange}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={12}>
            <FormControl sx={{ minWidth: 300 }} fullWidth>
              <TextField
                label="Ghi chú"
                multiline
                rows={5}
                value={note}
                onChange={onNoteChange}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={9}></Grid>
          {modalTransaction?.id ? (
            <div></div>
          ) : (
            <Grid item xs={12} lg={3}>
              <Button
                variant="contained"
                disableElevation
                color="primary"
                fullWidth
              >
                Tạo
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </Modal>
  );
}
