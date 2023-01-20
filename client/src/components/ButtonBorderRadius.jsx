import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const ButtonBorderRadius = styled(Button)({
  color: "#898989",
  boxShadow: "none",
  textTransform: "none",
  padding: "3px 8px",
  fontFamily: "inter",
  fontSize: 14,
  fontWeight: 600,
  borderRadius: 20,
  "&:hover": {
    backgroundColor: "#00000014",
    boxShadow: "none",
    color: "#222222",
  },
});

export default ButtonBorderRadius;
