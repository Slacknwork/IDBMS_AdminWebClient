"use client";

import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import {
    Typography,
    Box,
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableHead,
    TableRow,
    FormControl,
    TextField,
    InputAdornment,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import { getAllTransactions } from "/api/transactionServices";
import ProjectDocumentModal from "./Modal";
import { toast } from "react-toastify";
import transactionStatus from "/constants/enums/transactionStatus";
import transactionType from "/constants/enums/transactionType";

const transactions = [
    {
        id: "1",
        project: {
            name: "COOLNAME Building",
        },
        type: 1,
        amount: 500,
        createdDate: "1/1/2023",
        status: 0,
        user: {
            name: "Some random guy",
            email: "random@mail.com",
        },
    },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function ProjectList() {
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            const fetchDataFromApi = async () => {
                try {
                    const data = await getAllTransactions();
                    console.log(data)
                    setTransactions(data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    toast.error("Lỗi nạp dữ liệu từ hệ thống");
                }
            };
            fetchDataFromApi();
        }
    }, []);

    return (
        <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
            <Box sx={{ mt: 2 }}>
                <FormControl sx={{ mt: 2, minWidth: 300 }}>
                    <TextField
                        label="Tìm kiếm"
                        size="small"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconSearch />
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
                <FormControl sx={{ mx: 4, mt: 2, minWidth: 200 }} size="small">
                    <InputLabel>Loại giao dịch</InputLabel>
                    <Select labelId="demo-simple-select-label" label="Age">
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    disableElevation
                    color="primary"
                    onClick={handleModalOpen}
                >
                    Tạo giao dịch
                </Button>
                <ProjectDocumentModal
                    open={modalOpen}
                    onClose={handleModalClose}
                ></ProjectDocumentModal>
            </Box>
            <Table
                aria-label="simple table"
                sx={{
                    whiteSpace: "nowrap",
                    mt: 2,
                }}
            >
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Dự án
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Loại giao dịch
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Số tiền (VND)
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Người tạo
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Ngày tạo
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Trạng thái
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction) => (
                        <StyledTableRow key={transaction.id}>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {transaction?.project?.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    sx={{
                                        px: "4px",
                                        backgroundColor: "primary.main",
                                        color: "#fff",
                                    }}
                                    size="small"
                                    label={transactionType[transaction?.type] || "Không xác định"}
                                ></Chip>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={400}>
                                    {transaction?.amount}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {transaction?.user?.name}
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            sx={{
                                                fontSize: "13px",
                                            }}
                                        >
                                            {transaction?.user?.email}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={400}>
                                    {new Date(transaction?.createdDate).toLocaleDateString("en-GB")}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    sx={{
                                        px: "4px",
                                        backgroundColor: "primary.main",
                                        color: "#fff",
                                    }}
                                    size="small"
                                    label={transactionStatus[transaction?.status] || "Không xác định"}
                                ></Chip>
                            </TableCell>
                            <TableCell align="right">
                                <Button variant="contained" disableElevation color="primary">
                                    Chi tiết
                                </Button>
                            </TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}
