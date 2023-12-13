"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FormControl, TextField, InputAdornment } from "@mui/material";
import { IconSearch } from "@tabler/icons-react";

export default function Search({ query = "search", placeholder }) {
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
    search ? searchParams.set(query, search) : searchParams.delete(query);
    url.search = searchParams.toString();
    router.push(url.toString(), undefined, { scroll: false });
  };

  return (
    <FormControl sx={{ minWidth: 300 }}>
      <TextField
        label="Tìm kiếm"
        size="small"
        variant="outlined"
        placeholder={placeholder || ""}
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
