import {useGetProductsQuery} from "../../store/api/reviewApi.js";
import {Autocomplete, TextField} from "@mui/material";
import {Controller} from "react-hook-form";

export default function ControllerProduct({control}) {
  const {data: products, error, isLoading} = useGetProductsQuery();
  const options = !error && !isLoading && products ? products.map(option => option.value) : null

  return (
    <Controller
      render={({field, fieldState: {error, invalid}}) => (
        <Autocomplete
          {...field}
          fullWidth
          freeSolo
          size="small"
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Product"
              margin="normal"
              placeholder="Enter review product"
              error={invalid}
              helperText={error?.message}
              onChange={(event) => field.onChange(event.target.value)}
            />
          )}
          onChange={(_, data) => field.onChange(data)}
        />
      )}
      defaultValue=""
      name="product"
      rules={{required: "Product required!"}}
      control={control}
    />
  );
}
