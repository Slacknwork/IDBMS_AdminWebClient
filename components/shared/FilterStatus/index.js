"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function FilterStatus({
  query,
  options,
  label,
  allValue,
  allLabel,
}) {
  // INIT
  const router = useRouter();
  const searchParams = useSearchParams();

  // FILTER FORM
  const [filter, setFilter] = useState(
    searchParams.get(query) ? parseInt(searchParams.get(query)) : allValue
  );
  const onFilterChange = (e) => {
    setFilter(parseInt(e.target.value));
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    filter == allValue
      ? searchParams.delete(query)
      : searchParams.set(query, filter);

    url.search = searchParams.toString();
    router.push(url.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <FormControl sx={{ ml: 2, minWidth: 200 }} size="small">
      <InputLabel>{label || ""}</InputLabel>
      <Select value={filter} label={label || ""} onChange={onFilterChange}>
        {allValue && <MenuItem value={allValue}>{allLabel}</MenuItem>}
        {options?.map((option, index) => (
          <MenuItem value={index} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
