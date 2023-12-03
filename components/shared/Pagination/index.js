"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { TablePagination } from "@mui/material";
export default function Pagination({
  query,
  sizeQuery,
  count,
  label = "Hiển thị: ",
}) {
  // INIT
  const router = useRouter();
  const searchParams = useSearchParams();

  // PAGINATION
  const [rowsPerPage, setRowsPerPage] = useState(
    parseInt(searchParams.get(sizeQuery)) || 5
  );
  const [page, setPage] = useState(Math.max(searchParams.get(query) - 1, 0));

  const changeSearchParams = (newPage, newRowsPerPage) => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    searchParams.set(query, newPage + 1);
    searchParams.set(sizeQuery, newRowsPerPage);
    url.search = searchParams.toString();
    router.push(url.toString());
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    changeSearchParams(newPage, rowsPerPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    changeSearchParams(0, event.target.value);
  };

  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[2, 5, 10, 25, 50]}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage={label}
    />
  );
}
