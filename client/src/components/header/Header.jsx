import { useMemo, useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  MenuItem,
  Stack,
  FormControl,
  Select,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import LoginModal from "./LoginModal.jsx";
import HeaderDrawer from "./HeaderDrawer.jsx";
import HeaderMenu from "./HeaderMenu";
import { useDispatch, useSelector } from "react-redux";
import {loginDiscord, loginGoogle} from "../../store/authSlice.js";
import Search from "../search/Search.jsx";
import ButtonBorderRadius from "../ButtonBorderRadius";
import {useGetCategoriesQuery} from "../../store/api/reviewApi.js";

export default function Header() {
  const dispatch = useDispatch();

  const {data: categories, error, isLoading } = useGetCategoriesQuery();
  const { user, loading } = useSelector((state) => state.user);
  const [lang, setLang] = useState("EN");

  const handleChange = (event) => {
    setLang(event.target.value);
  };

  useMemo(() => {
    if (!user && error) {
      dispatch(loginGoogle());
      dispatch(loginDiscord());
    }
  }, []);

  return (
    <Toolbar>
      <Stack direction="row" alignItems="center" spacing={1}>
        <HeaderDrawer categories={categories} />
        <Box>
          <NavLink
            to={"/"}
            style={{
              width: "86px",
              height: "32px",
              background: "#ff4500",
              borderRadius: 0.5,
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography fontWeight={700} color="white">
              Reviews
            </Typography>
          </NavLink>
        </Box>
      </Stack>
      <Search />
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "block",
          },
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          sx={{
            mr: 1,
          }}
        >
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
              <Typography>{cat.value}</Typography>
            </NavLink>
          ))}
        </Stack>
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ color: "#878a8c" }}
      >
        <IconButton
          aria-label="search"
          sx={{
            display: {
              sm: "flex",
              md: "none",
            },
            alignItems: "center",
          }}
        >
          <SearchIcon />
        </IconButton>
        {user && (
          <Box
            sx={{
              display: {
                md: "block",
                sm: "none",
                xs: "none",
              },
            }}
          >
            <NavLink
              to={"/create"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ButtonBorderRadius
                sx={{
                  color: "white",
                  backgroundColor: "#ff4500",
                  height: 32,
                  padding: "0 25px",
                }}
              >
                <Typography fontWeight={500}>
                  Create
                </Typography>
              </ButtonBorderRadius>
            </NavLink>
          </Box>
        )}
        <FormControl
          sx={{
            width: 68,
            color: "inherit",
            display: {
              md: "block",
              sm: "none",
              xs: "none",
            },
          }}
          size="small"
        >
          <Select
            size="small"
            labelId="demo-select-small"
            value={lang}
            onChange={handleChange}
            sx={{ height: 32 }}
          >
            <MenuItem value={"EN"}>EN</MenuItem>
            <MenuItem value={"RU"}>RU</MenuItem>
          </Select>
        </FormControl>
        {user ? <HeaderMenu /> : <LoginModal />}
      </Stack>
    </Toolbar>
  );
}
