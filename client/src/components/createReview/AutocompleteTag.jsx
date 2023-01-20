import { Autocomplete, Chip, TextField } from "@mui/material";
import {useGetTagsQuery} from "../../store/api/reviewApi.js";

export default function AutocompleteTag({ setTags, tagsLocal }) {
  const {data: tags, error, isloading} = useGetTagsQuery({limit: 50});

  const handleChange = (event, value) => {
    console.log(value, "tags");
    setTags(value);
  };

  if (tags) return (
    <Autocomplete
      id="tags-filled"
      freeSolo
      multiple
      value={tagsLocal}
      onChange={handleChange}
      options={tags?.map((option) => option?.value)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          required
          margin="normal"
          color="info"
          size="small"
          variant="outlined"
          label="Tags"
          placeholder="Enter your tag"
        />
      )}
    />
  );
}
