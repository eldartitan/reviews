import {Chip, Stack, Box, Typography} from "@mui/material";
import {useLocation} from "react-router";
import {NavLink} from "react-router-dom";
import {useGetTagsQuery} from "../store/api/reviewApi.js";
import ButtonBorderRadius from "./ButtonBorderRadius.jsx";

export default function TagsPanel(props) {
  const location = useLocation();
  const categoryLocate = location.pathname.includes("/c/")
    ? `${location.pathname.split("/t/")[0]}/t`
    : "";

  const {data: tags, error, isloading} = useGetTagsQuery();

  const style = {
    unselected: {
      backgroundColor: "#edeff1",
      color: "#000000de",
    },
    selected: {
      backgroundColor: "#222222",
      color: "white",
    }
  }

  return (
    <Box
      sx={{
        maxWidth: 574,
      }}
    >
      <Stack direction="row" spacing={1} sx={{display: "inline-block"}}>
        {location.pathname.includes("/review/") ? (
          props.tags?.map((tag) => (
            <NavLink
              key={tag}
              to={`/${tag}`}
              style={{textDecoration: "none"}}
              state={{tags: tag, category: location?.state?.category}}
            >
              <Chip
                key={tag}
                label={tag}
                size="small"
                color={"default"}
                clickable
              />
            </NavLink>
          ))
        ) : (
          <>
            <NavLink
              to={"/"}
              style={{textDecoration: "none"}}
              state={null}
            >
              <ButtonBorderRadius
                onClick={() => props?.setSort(null)}
                sx={!props.params && !location?.state ? style.selected : style.unselected}
              >
                <Typography fontWeight={400} fontSize={13} >
                  All
                </Typography>
              </ButtonBorderRadius>
            </NavLink>
            <ButtonBorderRadius
              onClick={() => props?.setSort({params: {user_rating: -1}})}
              sx={props.params?.user_rating === -1 ? style.selected : style.unselected}
            >
              <Typography fontWeight={400} fontSize={13} >
                Highly rated
              </Typography>
            </ButtonBorderRadius>
            <ButtonBorderRadius
              onClick={() => props?.setSort({params: {_id: -1}})}
              sx={props.params?._id === -1 ? style.selected : style.unselected}
            >
              <Typography fontWeight={400} fontSize={13} >
                Last updated
              </Typography>
            </ButtonBorderRadius>
            {tags?.map((tag) => (
              <NavLink
                key={tag._id}
                to={`${categoryLocate}/${tag.value}`}
                style={{textDecoration: "none"}}
                state={location?.state?.tags === tag.value ? {category: location?.state?.category} : {
                  tags: tag.value,
                  category: location?.state?.category
                }}
              >
                <ButtonBorderRadius
                  key={tag._id}
                  sx={location?.state?.tags === tag.value ? style.selected : style.unselected}
                >
                  <Typography fontWeight={400} fontSize={13} >
                    {tag.value}
                  </Typography>
                </ButtonBorderRadius>
              </NavLink>
            ))}
          </>
        )}
      </Stack>
    </Box>
  );
}
