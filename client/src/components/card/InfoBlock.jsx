import { Box, Stack, Typography } from "@mui/material";
import { formatFromNow } from "../../utils/index.js";

export default function InfoBlock({ username, created, product, rating }) {
  const color = rating > 6 ? "#6c3" : rating > 4 ? "#fc3" : "#f00";

  return (
    <Stack
      direction="row"
      sx={{ my: 1, width: "100%" }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography color="#1c1c1c" variant="caption" underline="hover">
        {product} &#183; posted by {username} {formatFromNow(created)}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: color,
          width: 28,
          height: 28,
          borderRadius: 1,
        }}
      >
        <Typography variant="body2" color="white">
          {rating}
          &#9733;
        </Typography>
      </Box>
    </Stack>
  );
}
