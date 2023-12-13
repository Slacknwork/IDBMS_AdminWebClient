"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Autocomplete, FormControl, TextField } from "@mui/material";

export default function FilterAutocomplete({
  query,
  options = [{ id: -1, name: "Tất cả" }],
  label,
  allValue = -1,
  allLabel = "Tất cả",
}) {
  // INIT
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultOption = { id: allValue, name: allLabel };

  // FILTER FORM
  const [filter, setFilter] = useState(null);
  const onFilterChange = (e, value) => {
    setFilter(value);
  };

  useEffect(() => {
    if (options && options.length > 0) {
      const url = new URL(window.location.href);
      const searchParamsUrl = new URLSearchParams(url.search);
      !filter || filter?.id === allValue
        ? searchParamsUrl.delete(query)
        : searchParamsUrl.set(query, filter?.id);
      url.search = searchParamsUrl.toString();
      router.push(url.toString(), undefined, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (options && options.length > 0) {
      options.unshift(defaultOption);
      const id = parseInt(searchParams?.get(query));
      setFilter(options.find((option) => option.id === id) || defaultOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return (
    <FormControl sx={{ ml: 2, minWidth: 200 }} size="small">
      <Autocomplete
        size="small"
        value={filter}
        disableClearable
        onChange={onFilterChange}
        options={options}
        placeholder={allLabel}
        defaultValue={defaultOption}
        noOptionsText="Không có lựa chọn"
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            size="small"
            {...params}
            label={label}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </FormControl>
  );
}
