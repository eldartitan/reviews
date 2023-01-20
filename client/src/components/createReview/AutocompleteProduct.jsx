import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";
import {useGetProductsQuery} from "../../store/api/reviewApi.js";


export default function AutocompleteProduct({setProduct}) {
  const [value, setValue] = useState(null);
  const {data: products, error, isLoading} = useGetProductsQuery();
  const filter = createFilterOptions();

  useEffect(() => {
    setProduct(value?.value);
  }, [value]);

  if (products) return (
    <Autocomplete
      value={value}
      fullWidth
      size="small"
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            value: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          setValue({
            value: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const {inputValue} = params;

        const isExisting = options.some(
          (option) => inputValue === option.value
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            value: `Add "${inputValue}"`,
          });
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={products}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.value;
      }}
      renderOption={(props, option) => <li {...props}>{option.value}</li>}
      freeSolo
      renderInput={(params) => (
        <TextField margin="normal" {...params} label="Product" required/>
      )}
    />
  );
}
