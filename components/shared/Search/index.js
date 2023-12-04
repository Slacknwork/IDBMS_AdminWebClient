"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FormControl, TextField, InputAdornment } from "@mui/material";
import { IconSearch } from "@tabler/icons-react";

export default function Search({ query }) {
  // INIT
  const router = useRouter();
  const searchParams = useSearchParams();

  // SEARCH FORM
  const [search, setSearch] = useState(searchParams.get(query) || "");
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const onSearchSubmit = () => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    searchParams.set(query, search);
    url.search = searchParams.toString();
    router.push(url.toString());
  };

  return (
    <FormControl sx={{ minWidth: 300 }}>
      <TextField
        label="Tìm kiếm"
        size="small"
        variant="outlined"
        value={search}
        onChange={onSearchChange}
        onBlur={onSearchSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearchSubmit();
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconSearch />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
}
