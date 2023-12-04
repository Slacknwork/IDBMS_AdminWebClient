"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  IconTrashFilled,
  IconDownload,
  IconDeviceFloppy,
  IconUpload,
} from "@tabler/icons-react";

import DashboardCard from "/components/shared/DashboardCard";
import DocumentModal from "./modal";
import { deleteTaskReport, getTaskReportById, updateTaskReport } from "../../../../../../../api/taskReportServices";
import { toast } from "react-toastify";
import calculationUnitOptions from "/constants/enums/calculationUnit";
import { deleteTaskDocument } from "../../../../../../../api/taskDocumentServices";

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


  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);
  const [documents, setDocuments] = useState([]);

  const fetchDataFromApi = async () => {
    if (!initialized.current) {
      try {
        const data = await getTaskReportById(params.reportId)
        console.log(data)
        mapData(data)

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      }
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const handleUpdateReport = async () => {
    const request = {
      name: formData?.name ?? null,
      unitUsed: formData?.unitUsed !== undefined
        ? parseInt(formData.unitUsed, 10)
        : null,
      description: formData?.description ?? null,
      projectTaskId: params.taskId ?? null,
    };
    console.log(request)
    try {
      const response = await updateTaskReport(params.reportId, request);
      console.log(response);
      toast.success("Cập nhật thành công!");

    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const handleDeleteReport = async () => {
    try {
      const response = await deleteTaskReport(params.reportId);
      console.log(response);
      toast.success("Xóa thành công!");

    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const handleDeleteDocument = async (documentId) => {
    try {
      const response = await deleteTaskDocument(documentId);
      console.log(response);
      toast.success("Xóa thành công!");

    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const mapData = (data) => {
    console.log(data)
    if (data) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: data.name ?? "",
        calculationUnit: data?.projectTask?.calculationUnit ?? "",
        unitUsed: data.unitUsed ?? "",
        description: data.description ?? "",
      }));
      setDocuments(data?.taskDocuments ?? [])
    }
  };

  return (
    <DashboardCard title={"Báo cáo"}>
      <Box sx={{ overflow: "auto", mt: 3 }}>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <Grid
              container
              spacing={2}
              sx={{ pr: 3, borderRight: 1, borderColor: "gray" }}
            >
              <Grid
                item
                xs={12}
                lg={12}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="h4">Thông tin</Typography>
                <Box>
                  <Button
                    sx={{ mr: 2 }}
                    size="small"
                    variant="contained"
                    disableElevation
                    color="primary"
                    onClick={handleUpdateReport}
                  >
                    <IconDeviceFloppy></IconDeviceFloppy>
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    disableElevation
                    color="error"
                    onClick={handleDeleteReport}
                  >
                    <IconTrashFilled></IconTrashFilled>
                  </Button>
                </Box>
              </Grid>
              {/* NAME */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Tên báo cáo</Typography>
                    <Typography variant="p">Tên gọi của báo cáo này</Typography>
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
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {calculationUnitOptions[formData?.calculationUnit] ?? "Không xác định"}
                            </InputAdornment>
                          ),
                        }}
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

          {/* TABLE */}
          <Grid item xs={12} lg={6} sx={{ pl: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h4">Tài liệu</Typography>
              <Box sx={{ display: "flex" }}>
                <DocumentModal>
                  <IconUpload></IconUpload>
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
                      Tên file
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents?.map((document) => (
                  <StyledTableRow key={document.id}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={400}>
                        {document.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        sx={{ mr: 2 }}
                        size="small"
                        variant="contained"
                        disableElevation
                        color="primary"

                      >
                        <IconDownload></IconDownload>
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        disableElevation
                        color="error"
                        onClick={() => handleDeleteDocument(document.id)}
                      >
                        <IconTrashFilled></IconTrashFilled>
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
