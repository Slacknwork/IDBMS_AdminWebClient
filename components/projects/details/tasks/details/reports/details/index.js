"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import calculationUnitOptions from "/constants/enums/calculationUnit";
import DashboardCard from "/components/shared/DashboardCard";
import DocumentModal from "./modal";

const taskReports = [
  {
    id: "1",
    name: "Task Report 1",
    calculationUnit: 5,
    unitUsed: 25,
    createdTime: new Date("2023-01-15T08:00:00"),
    description: "Description for Task 1",
  },
  {
    id: "2",
    name: "Task Report 2",
    calculationUnit: 10,
    unitUsed: 50,
    createdTime: new Date("2023-02-01T10:30:00"),
    description: "Description for Task 2",
  },
  // Add more task reports as needed
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

export default function ReportDetails() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

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

  return (
    <DashboardCard title={"Báo cáo"}>
      <Box sx={{ overflow: "auto", mt: 3 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={6}>
            <Grid container spacing={2}>
              {/* NAME */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Tên công việc</Typography>
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

              {/* CALCULATION UNIT */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Đơn vị</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <Select
                        variant="outlined"
                        value={formData.calculationUnit}
                        onChange={(e) =>
                          handleInputChange("calculationUnit", e.target.value)
                        }
                        error={formData.calculationUnitError.hasError}
                      >
                        <MenuItem disabled value={-1}>
                          Chọn đơn vị
                        </MenuItem>
                        {calculationUnitOptions.map((unit, index) => (
                          <MenuItem key={unit} value={index}>
                            {unit}
                          </MenuItem>
                        ))}
                      </Select>
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
          <Grid item xs={12} lg={6}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Box sx={{ display: "flex" }}>
                <DocumentModal>
                  <span>Tạo báo cáo</span>
                </DocumentModal>
              </Box>
            </Box>
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Tên Báo cáo
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Thực hiện
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Ngày Tạo
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {taskReports?.map((taskReport) => (
                  <StyledTableRow key={taskReport.id}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={400}>
                        {taskReport.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={400}>
                        {`${taskReport.unitUsed} ${
                          calculationUnitOptions[taskReport.calculationUnit]
                        }`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={400}>
                        {new Date(taskReport.createdTime).toLocaleDateString(
                          "vi-VN"
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        component={Link}
                        variant="contained"
                        disableElevation
                        color="primary"
                        href={`/projects/${params.id}/tasks/${params.taskId}/reports/${taskReport.id}`}
                      >
                        Xem Chi Tiết
                      </Button>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Box>
    </DashboardCard>
  );
}
