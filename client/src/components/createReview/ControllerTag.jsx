import {Autocomplete, Chip, TextField} from "@mui/material";
import {useGetTagsQuery} from "../../store/api/reviewApi.js";
import {Controller} from "react-hook-form";

export default function ControllerTag({control}) {
  const {data: tags, error, isLoading} = useGetTagsQuery({limit: 50});
  const options = !error && !isLoading && tags ? tags.map(option => option.value) : null

  return (
    <Controller
      render={({field, fieldState: {error, invalid}}) => (
        <Autocomplete
          {...field}
          fullWidth
          multiple
          freeSolo
          size="small"
          options={options}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }

          renderInput={(params) => (
            <TextField
              {...params}
              label="Tags"
              margin="normal"
              placeholder="Enter review tags"
              error={invalid}
              helperText={error?.message}
              onChange={(event) => field.onChange(event.target.value)}
            />
          )}
          onChange={(_, data) => field.onChange(data)}
        />
      )}
      defaultValue={[]}
      name="tags"
      control={control}
    />
  )
}
