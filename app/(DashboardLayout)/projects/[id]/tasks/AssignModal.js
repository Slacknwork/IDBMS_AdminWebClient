"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Checkbox,
  Chip,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  tableCellClasses,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import participationRoleOptions from "/constants/enums/participationRole";

import { getParticipationsByProjectId } from "/services/projectParticipationServices";

import FormModal from "/components/shared/Modals/Form";
import Search from "/components/shared/Search";
import Pagination from "/components/shared/Pagination";
import FilterComponent from "/components/shared/FilterStatus";

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

export default function AssignModal() {
  // CONSTANTS
  const searchQuery = "assignSearch";
  const pageQuery = "assignPage";
  const pageSizeQuery = "assignPageSize";
  const roleQuery = "role";
  const roleAllValue = -1;

  // INIT
  const params = useParams();

  // PARTICIPATIONS
  const [count, setCount] = useState(0);
  const [participations, setParticipations] = useState([]);
  const fetchParticipations = async () => {
    try {
      const data = await getParticipationsByProjectId({
        projectId: params.id,
      });
      setParticipations(data.paginatedList?.list);
      setCount(data.paginatedList?.totalItem);
    } catch (error) {
      toast.error("Lỗi dữ liệu: Thành viên!");
    }
  };

  useEffect(() => {
    fetchParticipations();
  }, []);

  return (
    <FormModal
      sx={{ my: "auto", mr: 1 }}
      submitLabel="Chọn"
      title="Chọn thành viên"
      buttonLabel="Phân công"
    >
      <Grid item xs={12}>
        <Search query={searchQuery} placeholder="Tìm tên thành viên"></Search>
        <FilterComponent
          query={roleQuery}
          options={participationRoleOptions}
          label="Vai trò"
          allValue={roleAllValue}
          allLabel="Tất cả"
        ></FilterComponent>
        {participations && participations.length > 0 ? (
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell width={"10%"}></StyledTableCell>
                <StyledTableCell width={"45%"}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Tên
                  </Typography>
                </StyledTableCell>
                <StyledTableCell width={"45%"}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Vai trò
                  </Typography>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participations.map((participation) => (
                <StyledTableRow key={participation.id}>
                  <TableCell>
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {participation.user?.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={participationRoleOptions[participation.role]}
                    ></Chip>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Stack sx={{ my: 5 }}>
            <Typography variant="p" sx={{ textAlign: "center" }}>
              Không có dữ liệu.
            </Typography>
          </Stack>
        )}
        <Pagination
          query={pageQuery}
          sizeQuery={pageSizeQuery}
          count={count}
        ></Pagination>
      </Grid>
    </FormModal>
  );
}
