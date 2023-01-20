import { Autocomplete, TextField } from "@mui/material";
import {useGetCategoriesQuery} from "../../store/api/reviewApi.js";

export default function SelectCategories({ setCategories }) {
  const {data: categories, error, isLoading } = useGetCategoriesQuery();

  const handleChange = (event, value) => {
    console.log(value, event.target.value);
    setCategories(value);
  };

  if (categories) return (
    <Autocomplete
      disablePortal
      fullWidth
      id="combo-box-demo"
      size="small"
      onChange={handleChange}
      options={categories?.map((option) => option?.value)}
      renderInput={(params) => (
        <TextField {...params} margin="normal" label="Categories" required />
      )}
    />
  );
}
