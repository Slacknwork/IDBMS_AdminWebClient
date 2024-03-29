"use client";

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
    Typography,
    Box,
    Button,
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

import ProjectDocumentModal from "./Modal";

const documents = [
    {
        id: "1",
        name: "Contract",
        createdDate: "1/1/2023",
        category: 1,
        url: "asdfasdfasdf",
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
                    <InputLabel>Loại tài liệu</InputLabel>
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
                    Thêm tài liệu
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
                                Tên
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Ngày tạo
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Loại tài liệu
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            <Typography variant="subtitle2" fontWeight={600}>
                                Tải xuống
                            </Typography>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {documents.map((document) => (
                        <StyledTableRow key={document.id}>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {document.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={400}>
                                    {document.createdDate}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={400}>
                                    {document.category}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Button variant="contained" disableElevation color="primary">
                                    Tải xuống
                                </Button>
                            </TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}
