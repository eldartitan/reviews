import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { MenuRounded } from "@mui/icons-material";
import {useState} from "react";
import {NavLink} from "react-router-dom";

export default function HeaderDrawer({categories}) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <IconButton
        aria-label="search"
        sx={{
          alignItems: "center",
          display: {
            sm: "flex",
            md: "none",
          },
        }}
        onClick={handleClick}
      >
        <MenuRounded />
      </IconButton>
      <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {categories?.map((cat) => (
              <NavLink
                key={cat._id}
                to={`/c/${cat.value}`}
                state={{ category: cat.value}}
                style={({ isActive }) =>
                  isActive
                    ? {
                      textDecoration: "none",
                      color: "inherit",
                      borderBottom: "2px solid #222222",
                    }
                    : { textDecoration: "none", color: "#222222" }
                }
              >
                <ListItem key={cat.value + cat._id} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={cat.value} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
