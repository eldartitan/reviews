import {Autocomplete, TextField} from "@mui/material";
import {useGetCategoriesQuery} from "../../store/api/reviewApi.js";
import {Controller} from "react-hook-form";

export default function ControllerCategories({control}) {
  const {data: categories, error, isLoading} = useGetCategoriesQuery();

  if (categories && !error && !isLoading) return (
    <Controller
      render={({field, fieldState: {error, invalid}}) => (
        <Autocomplete
          {...field}
          fullWidth
          size="small"
          options={categories.map(option => option.value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              margin="normal"
              placeholder="Choose review category"
              error={invalid}
              helperText={error?.message}
            />
          )}
          onChange={(_, data) => field.onChange(data)}
        />
      )}
      defaultValue=""
      name="category"
      rules={{required: "Category required!"}}
      control={control}
    />
  );
}
