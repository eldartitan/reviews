import { useEffect, useState } from "react";
import { Stack, Typography, Box } from "@mui/material";
import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import ButtonBorderRadius from "../ButtonBorderRadius.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {useDislikeReviewMutation, useLikeReviewMutation} from "../../store/api/reviewApi.js";

export default function ButtonsBlock({ likes, comments, id }) {
  const [likeReview] = useLikeReviewMutation();
  const [dislikeReview] = useDislikeReviewMutation();

  const { user, loading, error } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    if (!liked) likeReview({review_id: id, user_id: user});
    else dislikeReview({review_id: id, user_id: user});
  };

  useEffect(() => {
    setLiked(likes?.includes(user?._id));
  }, [likes]);

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ height: 40, ml: 1 }}
      >
        <ButtonBorderRadius onClick={handleClick}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={liked ? { color: "#ff4500" } : null}
          >
            {liked ? (
              <Favorite sx={{ height: 20, width: 20 }} />
            ) : (
              <FavoriteBorderOutlined sx={{ height: 20, width: 20 }} />
            )}
            <Typography variant="body2">{likes?.length} likes</Typography>
          </Stack>
        </ButtonBorderRadius>
        <ButtonBorderRadius>
          <Link
            to={`/review/${id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <ChatBubbleOutline sx={{ height: 20, width: 20 }} />
              <Typography variant="body2">
                {comments?.length} comments
              </Typography>
            </Stack>
          </Link>
        </ButtonBorderRadius>
      </Stack>
    </Box>
  );
}
