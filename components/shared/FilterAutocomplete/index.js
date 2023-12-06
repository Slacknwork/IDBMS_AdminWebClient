"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Autocomplete, TextField, FormControl } from "@mui/material";

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
  const initialized = useRef(false);

  // FILTER FORM
  const [filter, setFilter] = useState(null);
  const onFilterChange = (e, value) => {
    setFilter(value);
  };

  useEffect(() => {
    if (options && options.length > 0 && initialized.current) {
      const url = new URL(window.location.href);
      const searchParamsUrl = new URLSearchParams(url.search);
      filter === allValue
        ? searchParamsUrl.delete(query)
        : searchParamsUrl.set(query, filter?.id);
      url.search = searchParamsUrl.toString();
      router.push(url.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (options && options.length > 0 && !initialized.current) {
      console.log(options);
      initialized.current = true;
      const id = parseInt(searchParams?.get(query));
      setFilter(options.find((option) => option.id === id) || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return (
    <FormControl sx={{ ml: 2, minWidth: 200 }} size="small">
      <Autocomplete
        size="small"
        value={filter}
        onChange={onFilterChange}
        options={options}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField size="small" {...params} label={label || "Chọn một"} />
        )}
      />
    </FormControl>
  );
}
