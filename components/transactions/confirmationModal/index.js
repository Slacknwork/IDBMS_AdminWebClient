"use client";

import {
    Modal,
    Box,
    Grid,
    Typography,
    FormControl,
    Autocomplete,
    TextField,
    InputLabel,
    Select,
    Button,
    MenuItem,
} from "@mui/material";
import { updateTransactionStatus } from "../../../api/transactionServices";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    p: 4,
};

const users = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
];

const projects = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
];

export default function TransactionConfirmUpdateModal({ open, onClose, transactionId }) {

    const handleAcceptProject = async (transactionId) => {
        console.log(transactionId)
        try {
            const response = await updateTransactionStatus(transactionId, 2);
            console.log(response);
            toast.success("Chấp nhận thành công!");
            initialized.current = false;
        } catch (error) {
            console.error("Error update :", error);
            toast.error("Lỗi!");
        }
    };

    const handleRejectProject = async (transactionId) => {
        console.log(transactionId)
        try {
            const response = await updateTransactionStatus(transactionId, 6);
            console.log(response);
            toast.success("Từ chối thành công!");
            initialized.current = false;
        } catch (error) {
            console.error("Error update :", error);
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
                <Typography variant="h6" component="h2">
                    Duyệt giao dịch
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={3}>                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Button
                            variant="contained"
                            disableElevation
                            color="error"
                            fullWidth
                        >
                            Từ chối
                        </Button>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Button
                            variant="contained"
                            disableElevation
                            color="success"
                            fullWidth
                        >
                            Đồng ý
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}
