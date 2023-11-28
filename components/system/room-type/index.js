
import Link from "next/link";
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
  Chip,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getAllRoomTypes } from "../../../api/roomTypeServices";
import Image from "next/image";

const products = [
  {
    id: "1",
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    priority: "Low",
    pbg: "primary.main",
    budget: "3.9",
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

  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getAllRoomTypes();
          console.log(data);
          setRoomTypes(data);
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
                Id
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Tên
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Ảnh 
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Mô tả
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Giá mỗi diện tích
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Icon
              </Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roomTypes.map((roomType) => (
            <StyledTableRow key={roomType.id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {roomType.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {roomType.name}
                </Typography>
              </TableCell>
              <TableCell>
              <Image src={roomType.imageUrl}
                    alt=""
                    width={0}
                    height={0}
                    style={{ width: "10rem", height: "10rem", objectFit: "cover" }}
                    unoptimized={true}/>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {roomType.description}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {roomType.pricePerArea.toLocaleString('en-US') + ' VND'}
                </Typography>
              </TableCell>
              <TableCell>
              <Image src={roomType.iconImageUrl}
                    alt=""
                    width={0}
                    height={0}
                    style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
                    unoptimized={true}/>
              </TableCell>
              <TableCell align="right">
                <Button
                  component={Link}
                  variant="contained"
                  disableElevation
                  color="primary"
                  href={`/RoomTypes/${roomType.id}`}
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
