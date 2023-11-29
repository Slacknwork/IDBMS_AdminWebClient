"use client";

import Link from "next/link";
import { styled } from "@mui/material/styles";
import { useParams } from "next/navigation";
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
  Chip,
  FormControl,
  TextField,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getProjectTasksByProjectId } from "../../../api/projectTaskServices";
import projectTaskStatus from "../../../constants/enums/projectTaskStatus";

const tasks = [
  {
    id: "1",
    code: "FILL01",
    name: "Filling cement",
    percentage: 50,
    pricePerUnit: 5,
    unitInContract: 5,
    unitUsed: 6,
    status: 0,
    paymentStage: {
      name: "Final payment section",
    },
    startedDate: "1/1/2023",
    endDate: "1/1/2023",
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
  const params = useParams();

  const [tasks, setTasks] = useState([]);
  const [projectId, setProjectId] = useState(params.id);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getProjectTasksByProjectId(projectId);
          console.log(data);
          setTasks(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Lỗi nạp dữ liệu từ hệ thống");
        }
      };
      fetchDataFromApi();
    }
  }, [projectId]);

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
          <InputLabel>Trạng thái</InputLabel>
          <Select labelId="demo-simple-select-label" label="Status">
            {Object.entries(projectTaskStatus).map(([label, value]) => (
              <MenuItem key={label} value={label}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
                Mã
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Tên công việc
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Tiến độ
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Giai đoạn thanh toán
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Tổng tiền
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
          {tasks.map((task) => (
            <StyledTableRow key={task.id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {task.code}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {task.name}
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
                  label={`${task.percentage}%`}
                ></Chip>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {task.paymentStage?.name || "Chưa xác định"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {task.pricePerUnit * task.unitUsed}
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
                  label={projectTaskStatus[task.status] || "Không xác định"}
                ></Chip>
              </TableCell>
              <TableCell align="right">
                <Button
                  component={Link}
                  variant="contained"
                  disableElevation
                  color="primary"
                  href={`/projects/${params.id}/tasks/${task.id}`}
                >
                  Thông tin
                </Button>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
