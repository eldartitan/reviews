import {TextField} from "@mui/material";
import {Controller} from "react-hook-form";

export default function ControllerTextField({control, name, rows, inputProps}) {
  return (
    <Controller
      render={({field, fieldState: {error, invalid}}) => (
        <TextField
          {...field}
          error={invalid}
          helperText={error?.message}
          label={name}
          size="small"
          margin="normal"
          fullWidth
          multiline
          maxRows={rows}
          inputProps={inputProps}
        />
      )}
      name={name.toLowerCase()}
      rules={{ required: `${name} required!` }}
      control={control}
      defaultValue=""
    />
  )
}