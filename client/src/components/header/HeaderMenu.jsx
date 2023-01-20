import {
  KeyboardArrowDown,
  Logout,
  PersonOutline,
  PersonOutlineOutlined
} from "@mui/icons-material";
import {ListItemIcon, Menu, MenuItem, Box, Typography} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice.js";
import { NavLink } from "react-router-dom";

export default function HeaderMenu() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 1,
          height: 30,
          color: "#878a8c",
        }}
      >
        <button
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
        >
          <PersonOutline />
          <KeyboardArrowDown />
        </button>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Typography textAlign="center" variant="subtitle2" sx={{py: 1}}>{user.username}</Typography>
        <NavLink
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/my-page"}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonOutlineOutlined fontSize="small" />
            </ListItemIcon>
            Account
          </MenuItem>
        </NavLink>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
