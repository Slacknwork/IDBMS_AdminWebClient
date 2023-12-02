// Import necessary components and libraries
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";

import CreateFloorModal from "./modal";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getFloorsByProjectId } from "../../../../../api/floorServices";

// Sample comments data
const floors = [
  {
    id: 1,
    floorNo: 1,
    description: "First Floor",
    usePurpose: "Office",
  },
  {
    id: 2,
    floorNo: 2,
    description: "Second Floor",
    usePurpose: "Conference Rooms",
  },
  // Add more floor objects as needed
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Floors() {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);
  const [values, setValues] = useState([]);

  const fetchDataFromApi = async () => {
    if (!initialized.current) {
      try {
        const projectId = params.id;
        const data = await getFloorsByProjectId(projectId);
        console.log(data)
        setValues(data)

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

  return (
    <Box sx={{ overflow: "auto" }}>
      {/* Table */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <CreateFloorModal>Tạo tầng</CreateFloorModal>
      </Box>
      <Table aria-label="simple table" sx={{ mt: 1 }}>
        {/* Table Head */}
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Tầng số
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Mục đích
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Mô tả
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="right">
              {/* <Typography variant="subtitle2" fontWeight={600}>
                Chi tiết
              </Typography> */}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        {/* Table Body */}
        <TableBody>
          {values &&
            values.map((floor) => (
              <StyledTableRow key={floor.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {floor.floorNo}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {floor.usePurpose}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {floor.description}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/projects/${params.id}/floors/${floor.id}`}
                  >
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
