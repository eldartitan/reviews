import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Google } from "@mui/icons-material";
import ButtonBorderRadius from "../ButtonBorderRadius.jsx";
import discord from "../../assets/discord-icon.svg";

// const API_URL = import.meta.env.VITE_REACT_API_URL;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <ButtonBorderRadius
        onClick={handleOpen}
        sx={{
          color: "#222222",
          border: "1px solid #898989",
          height: 32,
          padding: "0 25px",
          "&:hover": {
            backgroundColor: "#222222",
            color: "white",
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          Log in
        </Typography>
      </ButtonBorderRadius>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", mb: 3 }}
          >
            Log in with
          </Typography>
          <Box sx={{ width: 320, margin: "auto" }}>
            <Button
              fullWidth
              variant="contained"
              color="inherit"
              sx={{ mb: 2 }}
              onClick={() => window.open(`/auth/google`, "_self")}
            >
              <Google />
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="inherit"
              onClick={() => window.open(`/auth/discord`, "_self")}
            >
              <img
                alt="discord"
                src={discord}
                height={32}
                style={{ color: "inherit" }}
              />
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
