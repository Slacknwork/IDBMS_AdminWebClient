"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { styled } from "@mui/material/styles";
import { IconSearch } from "@tabler/icons-react";
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
  InputLabel,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import { getParticipationByProjectId } from "../../../api/projectParticipationServices";
import ProjectParticipantModal from "./Modal";
import { toast } from "react-toastify";
import participationRole from "../../../constants/enums/participationRole";

const participants = [
  {
    id: "1",
    name: "Architect Merlot",
    email: "merlot@something.com",
    role: 1,
    status: 0,
    language: 0,
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

export default function ProjectParticipants() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);

  const params = useParams();
  console.log(params.id)

  const [participants, setParticipants] = useState([]);
  const [projectId, setProjectId] = useState(params.id);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  const fetchDataFromApi = async (projectId) => {
    try {
      const data = await getParticipationByProjectId(projectId);
      console.log(data);
      setParticipants(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi nạp dữ liệu từ hệ thống");
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      fetchDataFromApi(projectId);
    }
  }, [projectId]);
  const handleModalClose = () => {
    setModalOpen(false);
    fetchDataFromApi(projectId)
  }
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
        <FormControl sx={{ ml: 2, mt: 2, minWidth: 150 }} size="small">
          <InputLabel>Vai trò</InputLabel>
          <Select labelId="demo-simple-select-label" label="Age">
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ ml: 2, mt: 2, minWidth: 150 }} size="small">
          <InputLabel>Trạng thái</InputLabel>
          <Select labelId="demo-simple-select-label" label="Age">
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Button
          sx={{ ml: 2, mt: 2 }}
          variant="contained"
          disableElevation
          color="primary"
          onClick={handleModalOpen}
        >
          Thêm thành viên
        </Button>
        <ProjectParticipantModal
          open={modalOpen}
          onClose={handleModalClose}
          projectId={params.id}
        ></ProjectParticipantModal>
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
                Tên người tham gia
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Vai trò
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participants.map((participant) => (
            <StyledTableRow key={participant.id}>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {participant?.user?.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {participationRole[participant?.role] || "Không xác định"}
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
                  label={participant.isDeleted ? "Đã xóa" : "Đang hoạt động" ?? "Không xác định"}
                ></Chip>
              </TableCell>
              <TableCell align="right">
                <Button variant="contained" disableElevation color="error">
                  Xóa
                </Button>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Box >
  );
}
